import app from "./app.js";
import { DEFAULT } from "./config.js";

const PORT = process.env.PORT ?? DEFAULT.PORT;

app.listen(PORT, () => {
  console.log(`Servidor local en http://localhost:${PORT}`);
});
