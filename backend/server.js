const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/register', (req, res) => {
  const { username, password } = req.body;
  const db = router.db;
  const userExists = db.get('users').find({ username }).value();

  if (userExists) {
    return res.status(400).json({ error: 'Пользователь уже существует' });
  }

  const newUser = {
    id: Date.now().toString(),
    username,
    password,
    role: 'user'
  };

  db.get('users').push(newUser).write();
  res.status(201).json({ id: newUser.id, username: newUser.username, role: newUser.role });
});

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get('users').find({ username, password }).value();

  if (!user) {
    return res.status(401).json({ error: 'Неверный логин или пароль' });
  }

  return res.json({ id: user.id, username: user.username, role: user.role });
});

server.use(router);
server.listen(3001, () => {
  console.log('Backend server is running on port 3001');
});
