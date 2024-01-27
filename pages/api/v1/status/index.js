import database from "infra/database";

async function status(req, res) {
  const updatedAt = new Date().toISOString();
  const pgVersion = await database.query("SELECT VERSION();");
  const parsedPgVersion = pgVersion.rows[0]["version"].substring(11, 15);
  const pqMaxConnections = await database.query("SHOW max_connections;");
  const pqUsedConnections = await database.query(
    "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = 'local_db';",
  );
  const maxPqConnections = pqMaxConnections.rows[0].max_connections;
  const usedPqConnections = pqUsedConnections.rows[0].count;

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: parseFloat(parsedPgVersion),
        max_connections: parseInt(maxPqConnections),
        in_use_connections: parseInt(usedPqConnections),
      },
    },
  });
}

export default status;
