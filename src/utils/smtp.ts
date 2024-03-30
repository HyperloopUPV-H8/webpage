/* SmtpJS.com - v3.0.0 */
// Modified to include typescript type signatures

type SmtpRequest =
    | {
          To: string | string[];
          From: string;
          Subject: string;
          Body: string;
          Attatchments?: Attatchment[];
      }
    | SecureTokenRequest
    | UserRequest;

type Attatchment =
    | {
          name: string;
      }
    | AttatchmentPath
    | AttatchmentData;

type AttatchmentPath = {
    path: string;
};

type AttatchmentData = {
    data: string;
};

type SecureTokenRequest = {
    SecureToken: string;
};

type UserRequest = {
    Host: string;
    Username: string;
    Password: string;
};

export default function send(request: SmtpRequest): Promise<string> {
    return new Promise(function (resolve: (response: string) => void) {
        ajaxPost(
            `https://smptjs.com/v3/smptjx.ajax?`,
            JSON.stringify({
                nocache: Math.floor(1e6 * Math.random() + 1),
                Action: 'send',
                ...request,
            }),
            function (ajaxPostResolve) {
                resolve(ajaxPostResolve);
            }
        );
    });
}

function ajaxPost(
    url: string,
    content: string,
    resolve: (response: string) => void
) {
    const request = new XMLHttpRequest();
    request.open('POST', url, true);

    request.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded'
    );

    request.onload = function () {
        resolve(request.responseText);
    };

    request.send(content);
}

// Original source:
// export default Email = {
//     send: function (a) {
//         return new Promise(function (n, e) {
//             (a.nocache = Math.floor(1e6 * Math.random() + 1)),
//                 (a.Action = 'Send');
//             var t = JSON.stringify(a);
//             Email.ajaxPost(
//                 'https://smtpjs.com/v3/smtpjs.aspx?',
//                 t,
//                 function (e) {
//                     n(e);
//                 }
//             );
//         });
//     },
//     ajaxPost: function (e, n, t) {
//         var a = Email.createCORSRequest('POST', e);
//         a.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'),
//             (a.onload = function () {
//                 var e = a.responseText;
//                 null != t && t(e);
//             }),
//             a.send(n);
//     },
//     ajax: function (e, n) {
//         var t = Email.createCORSRequest('GET', e);
//         (t.onload = function () {
//             var e = t.responseText;
//             null != n && n(e);
//         }),
//             t.send();
//     },
//     createCORSRequest: function (e, n) {
//         var t = new XMLHttpRequest();
//         return (
//             'withCredentials' in t
//                 ? t.open(e, n, !0)
//                 : 'undefined' != typeof XDomainRequest
//                 ? (t = new XDomainRequest()).open(e, n)
//                 : (t = null),
//             t
//         );
//     },
// };
