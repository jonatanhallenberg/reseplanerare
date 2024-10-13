import dotenv from "dotenv";
import app from "./app";

// Ladda .env filen
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server körs på port ${PORT}`);
});
