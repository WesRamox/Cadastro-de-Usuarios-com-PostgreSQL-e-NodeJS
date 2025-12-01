import "./dotenv/config"
import app from "./app";

app.listen(3000, () => {
  console.log("Servidor no ar em http://localhost:3000");
});
