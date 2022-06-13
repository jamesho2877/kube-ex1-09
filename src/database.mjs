import pg from "pg";

const {
  NS,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

export default class Database {
  #pool;

  constructor() {
    this.#pool = new pg.Pool({
      host: `postgres-svc.${NS}.svc.cluster.local`,
      port: 5432,
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      max: 10,
    });

    this.#pool.on("error", async (err) => {
      console.error("Unexpected error on idle client", err);
    });
  }

  async readPingPongContent() {
    let data;
    try {
      const rs = await this.#pool.query("SELECT pingpong FROM counter WHERE id = 1");
      data = rs.rows?.[0]?.pingpong || 0;
    } catch (err) {
      console.error(err);
    } finally {
      return data;
    }
  }
  
  async writePingPongContent(pingpong) {
    const rs = await this.#pool.query({
      text: "INSERT INTO counter VALUES (1,DEFAULT,$1) ON CONFLICT (id) DO UPDATE SET pingpong = $1 RETURNING *",
      values: [pingpong],
    });
    return rs.rows?.[0]?.pingpong || "";
  }
}