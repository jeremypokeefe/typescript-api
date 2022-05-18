import { Router } from 'express';

type Wrapper = ((router: Router) => void);

export const applyMiddleware = (
  router: Router,
  middlewareWrappers: Wrapper[],
) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};
