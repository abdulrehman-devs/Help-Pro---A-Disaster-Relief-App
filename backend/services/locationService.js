import axios from "axios";

const getCityFromCoords = async (lat, lng) => {
    try {
        const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`,
            {
                headers: {
                    "User-Agent": "disaster-relief-app"
                }
            }
        );

        const address = res.data.address;
        
        const city = address.city || address.district || address.state || address.residential || "Lahore";

        console.log("Detected city:", city);
        return city;

    } catch (error) {
        console.error("Error getting city:", error.message);
        return "Unknown location";
    }
};

export default getCityFromCoords;