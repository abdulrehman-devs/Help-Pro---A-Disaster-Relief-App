import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
            role: decoded.role,
            name: decoded.name,
            phone: decoded.phone
        };


        next();
    }
    catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};