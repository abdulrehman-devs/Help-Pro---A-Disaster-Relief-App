export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        try {
            if (!req.user || !req.user.role) {
                return res.status(401).json({ message: "Unauthorized: No user found" });
            }

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden: Access denied" });
            }

            next();
        }
        catch (error) {
            console.error("authorizeRoles middleware error:", error);
            res.status(500).json({ message: "Server error in authorization" });
        }
    };
};
