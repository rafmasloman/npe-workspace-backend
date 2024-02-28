import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import ProfileController from '../controller/profile.controller';

class ProfileRoute {
  static route = Router();

  static routes(): Router {
    // this.route.get('/:userId', authToken, ProfileController.updateProfile);
    this.route.get('/:userId', authToken, ProfileController.getUserProfile);
    this.route.put('/:userId', authToken, ProfileController.updateProfile);

    return this.route;
  }
}

export default ProfileRoute;
