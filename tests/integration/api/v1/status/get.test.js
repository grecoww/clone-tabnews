test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.updated_at).toBeDefined();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.postgres_version).toBeDefined();
  const parsedPgVersion = Number(
    responseBody.dependencies.database.postgres_version,
  );
  expect(parsedPgVersion).toBe(
    responseBody.dependencies.database.postgres_version,
  );

  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  const parsedMaxConnections = Number(
    responseBody.dependencies.database.max_connections,
  );
  expect(parsedMaxConnections).toBe(
    responseBody.dependencies.database.max_connections,
  );

  console.log(responseBody.dependencies.database.in_use_connections);
  expect(responseBody.dependencies.database.in_use_connections).toBeDefined();
  const parsedusedConnections = Number(
    responseBody.dependencies.database.in_use_connections,
  );
  expect(parsedusedConnections).toBe(
    responseBody.dependencies.database.in_use_connections,
  );
});
