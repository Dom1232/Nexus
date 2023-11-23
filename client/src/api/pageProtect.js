import auth from './auth-help';

export function pageVerify(to, from, next) {
  if (auth.isAuthenticated()) {
    next();
  } else {
    next('/'); 
  }
}