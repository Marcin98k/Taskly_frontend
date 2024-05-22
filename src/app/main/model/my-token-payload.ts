import { JwtPayload } from 'jwt-decode';

interface MyTokenPayload extends JwtPayload {
  userId: number;
}
