export default function isLoggedin() {
  return localStorage.getItem('LOGIN_JWT');
}
