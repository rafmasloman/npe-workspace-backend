import { Router } from 'express';
import authToken from '../middleware/auth.middleware';
import ProfileController from '../controller/profile.controller';

class ProfileRoute {
  static route = Router();

  static routes(): Router {
    // this.route.get('/:userId', authToken, ProfileController.updateProfile);
    this.route.get('/:userId', authToken, ProfileController.getUserProfile);

    return this.route;
  }
}

export default ProfileRoute;
