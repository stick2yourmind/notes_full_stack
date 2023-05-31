import { FRONTEND_ORIGIN } from 'src/utils/constant';

export const corsConfig = {
  allowedHeaders: '*',
  origin: [FRONTEND_ORIGIN],
};
