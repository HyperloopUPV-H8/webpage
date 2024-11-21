import axios from 'axios';

const CLIENT_ID = '3sfbmzpgqg9e6ezfsooo5ug48rjx0u';
const CHANNEL_NAME = "HyperloopUPV"


export async function isHyperloopUPVOnline(): Promise<boolean> {
  try {
    const response = await axios.get('https://api.twitch.tv/helix/streams', {
      headers: {
        'Client-ID': CLIENT_ID,
      },
      params: {
        user_login: CHANNEL_NAME,
      },
    });

    const streams = response.data.data;
    return streams.length > 0; 
  } catch (error) {
    console.error('Error verificando el estado del canal:');
    return false;
  }
}