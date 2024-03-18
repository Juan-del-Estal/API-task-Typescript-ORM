import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { UserEntity } from '../../user/entities/user.entity';
import { userLogin } from '../services/auth.service';

// Tipamos manualmente DoneFunction para evitar errores
type DoneFunction = (error: any, user?: UserEntity | false, info?: any) => void;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done: DoneFunction) => {
  try {
    const user = await userLogin(email, password );
    if (!user) {
      return done(null, false, { message: 'Incorrect email or password' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Serialization
passport.serializeUser((user, done) => {
  const userEntity = user as UserEntity;
  done(null, userEntity.id);
});

// Deserialización de usuario
passport.deserializeUser<UserEntity>(async (id, done) => {
  try {
    const userId = String(id); // Ensure id is treated as a string
    const user = await UserEntity.findById(userId);
    if (!user) {
      return done(new Error('User not found'));
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export default passport;