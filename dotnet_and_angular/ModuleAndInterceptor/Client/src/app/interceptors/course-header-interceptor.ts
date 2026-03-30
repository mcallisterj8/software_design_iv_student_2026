import { HttpInterceptorFn } from '@angular/common/http';

/**
  This interceptor runs for outgoing HTTP requests.
  It receives the current request and a "next" function that passes the request
  along to the next interceptor or to the backend if there are no more interceptors.

  Since this is a functional interceptor rather than a class definition of an 
  interceptor, it is registered in the app-level configuration instead of through 
  a module provider. In our application, that configuration is in app.config.ts.
  Check that file to see how this interceptor is registered.
*/
export const courseHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  /**
    HttpRequest objects are immutable, so we do not modify request directly.
    Instead we create a cloned copy of the request and add our custom header.
  */
  const modifiedRequest = req.clone({
    setHeaders: {
      'x-course-name': 'Software Design IV',
    },
  });

  /**
    Pass the modified request onward in the HTTP pipeline.
    If there are more interceptors, they will receive this modified version.
    Otherwise, Angular sends it to the server.
  */
  return next(modifiedRequest);
};
