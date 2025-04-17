import net from 'net';

export const DEFAULT_PORT = 5000;

// Função para verificar se uma porta está disponível
export const checkPort = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = net
      .createServer()
      .once('error', () => {
        resolve(false);
      })
      .once('listening', () => {
        server.close();
        resolve(true);
      })
      .listen(port);
  });
};

// Função para encontrar uma porta disponível
export const findAvailablePort = async (startPort: number): Promise<number> => {
  let port = startPort;
  while (!(await checkPort(port))) {
    port++;
  }
  return port;
};

// Função para iniciar o servidor
export const startServer = async (app: any) => {
  try {
    const requestedPort = Number(process.env.PORT) || DEFAULT_PORT;
    const port = await findAvailablePort(requestedPort);
    const NODE_ENV = process.env.NODE_ENV || 'development';
    const isDocker = process.env.POSTGRES_HOST === 'postgres';

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running in ${NODE_ENV} mode on port ${port}`);
      console.log(`Running in ${isDocker ? 'Docker' : 'Local'} environment`);
      console.log(`Database host: ${process.env.POSTGRES_HOST}`);
      console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
      console.log(`Swagger JSON available at http://localhost:${port}/swagger.json`);

      if (port !== requestedPort) {
        console.log(`Note: Port ${requestedPort} was in use, using port ${port} instead`);
      }
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};
