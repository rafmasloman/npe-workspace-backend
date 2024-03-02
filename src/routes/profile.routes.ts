import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import ProfileController from '../controller/profile.controller';
import multerConfig from '../libs/multer.libs';

class ProfileRoute {
  static route = Router();

  static routes(): Router {
    // this.route.get('/:userId', authToken, ProfileController.updateProfile);
    this.route.get('/:userId', authToken, ProfileController.getUserProfile);
    this.route.get(
      '/picture/:userId',
      authToken,
      ProfileController.getUserProfilePicture,
    );
    this.route.put('/:userId', authToken, ProfileController.updateProfile);
    this.route.put(
      '/profilePicture/:userId',
      authToken,
      multerConfig('members').single('profilePicture'),
      ProfileController.updateProfilePicture,
    );

    return this.route;
  }
}

export default ProfileRoute;
