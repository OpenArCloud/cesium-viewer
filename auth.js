const FUSIONAUTH_DOMAIN = "https://YOUR-FUSIONAUTH-DOMAIN";
const CLIENT_ID = "YOUR_CLIENT_ID";
const REDIRECT_URI = "http://localhost:8044";

//
// 1) LOGIN – redirect FusionAuth
//
export function login() {
  const url =
    `${FUSIONAUTH_DOMAIN}/oauth2/authorize?` +
    `client_id=${CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=openid offline_access`;

  window.location.href = url;
}

//
// 2) LOGOUT – FusionAuth logout
//
export function logout() {
  const url =
    `${FUSIONAUTH_DOMAIN}/oauth2/logout?client_id=${CLIENT_ID}&` +
    `post_logout_redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

  window.location.href = url;
}

//
// 3) INIT
//
export async function handleRedirect() {
  const params = new URLSearchParams(window.location.search);
  const authCode = params.get("code");

  if (authCode) {
    console.log("FusionAuth redirect detected. User is logged in.");
    //No token exchange, session cookie already in browser
    window.history.replaceState({}, document.title, "/");
  }
}

//
// 4) USER INFO
//
export async function getUserInfo() {
  try {
    const response = await fetch(`${FUSIONAUTH_DOMAIN}/oauth2/userinfo`, {
      credentials: "include"
    });

    if (!response.ok) return null;

    return await response.json();
  } catch (e) {
    return null;
  }
}
