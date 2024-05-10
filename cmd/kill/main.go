package main

import (
	"fmt"
	"net"
	"os"
	"time"
)

const expectedKillCode = "Skidadle Skidoodle This Back is no Being Killed >:D"

func main() {
	laddr, err := net.ResolveTCPAddr("tcp", "127.0.0.1:0")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Resolving local address: %s\n", err)
		os.Exit(1)
	}

	raddr, err := net.ResolveTCPAddr("tcp", "127.0.0.1:4040")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Resolving remote address: %s\n", err)
		os.Exit(1)
	}

	conn, err := net.DialTCP("tcp", laddr, raddr)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Dialing: %s\n", err)
		os.Exit(1)
	}
	defer conn.Close()

	writeDone := make(chan struct{})
	go writeKillCode(conn, writeDone)

	select {
	case <-writeDone:
	case <-time.After(time.Second * 5):
		fmt.Fprintln(os.Stderr, "Timed out writting code", err)
		os.Exit(1)
	}

	fmt.Println("Success!")
	os.Exit(0)
}

func writeKillCode(conn *net.TCPConn, notification chan<- struct{}) {
	buffer := []byte(expectedKillCode)

	totalWrite := 0
	for totalWrite < len(buffer) {
		n, err := conn.Write(buffer[totalWrite:])
		totalWrite += n
		if err != nil {
			fmt.Fprintf(os.Stderr, "Write: %s\n", err)
			os.Exit(1)
		}
	}

	notification <- struct{}{}
}
