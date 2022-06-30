import { Request } from "express";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { JWT_CONFIG } from "../config";
import { collections } from "./dbService";
import usersService from "./usersService";

export function tokenService() {
  const users = usersService(collections);

  function getUsername(token: string) {
    const decoded = jwt.decode(token) as JwtPayload;
    return decoded.sub || null;
  }

  function getAudience(token: string) {
    const decoded = jwt.decode(token) as JwtPayload;
    if (!decoded?.aud || !Array.isArray(decoded.aud)) return [];
    return decoded.aud;
  }

  async function generateToken(prevToken: string | null, userName: string) {
    const name = userName;
    if (!name) return;
    if (!JWT_CONFIG.SECRET) return;

    const user = await users.getByUsername(name);
    const options: SignOptions = {
      algorithm: "HS256",
      expiresIn: JWT_CONFIG.EXPIRY,
      issuer: JWT_CONFIG.ISSUER,
      subject: userName || user.username,
      audience:
        user.role === "admin"
          ? JWT_CONFIG.ADMIN_AUDIENCE
          : JWT_CONFIG.MEMBER_AUDIENCE,
    };
    return jwt.sign({}, JWT_CONFIG.SECRET, options);
  }

  function verifyToken(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!JWT_CONFIG.SECRET) return false;

      jwt.verify(token, JWT_CONFIG.SECRET as string, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  function tokenFromRequest(req: Request) {
    const authorizationHeader = req.headers.authorization?.split(" ");
    if (!authorizationHeader || authorizationHeader.length !== 2) return null;

    return authorizationHeader[1];
  }

  return {
    getUsername,
    getAudience,
    generateToken,
    verifyToken,
    tokenFromRequest,
  };
}
