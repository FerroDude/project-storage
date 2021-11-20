import React from 'react';
import { Route, Switch } from 'react-router';
import HomeView from '../views/Home';
import ProfileView from '../views/Profile';
import SettingsView from '../views/Settings';
import SignInView from '../views/SignIn';
import StorageView from '../views/Storage';
import StorageCreateView from '../views/StorageCreate';
import StorageManagementView from '../views/StorageManagement';
import StorageListView from '../views/StorageList';
import ProtectedRoute from './ProtectedRoute';
import SignUpView from './SignUpForm';

export default function AllRoutes({
  handleAuthenticationChange,
  user,
  isLoaded,
  handleEditUser
}) {
  return (
    <Switch>
      <ProtectedRoute
        path="/signIn"
        authorized={!isLoaded || !user}
        redirect="/"
        render={(props) => (
          <SignInView
            {...props}
            onAuthenticationChange={handleAuthenticationChange}
          />
        )}
      />

      <ProtectedRoute
        path="/signUp"
        authorized={!isLoaded || !user}
        redirect="/"
        render={(props) => (
          <SignUpView
            {...props}
            onAuthenticationChange={handleAuthenticationChange}
          />
        )}
      />

      <ProtectedRoute
        path="/profile"
        authorized={isLoaded && user}
        redirect="/signIn"
        render={(props) => <ProfileView {...props} user={user} />}
      />
      <ProtectedRoute
        path="/settings"
        authorized={isLoaded && user}
        redirect="/signIn"
        render={(props) => (
          <SettingsView {...props} onEditUser={handleEditUser} />
        )}
      />
      <ProtectedRoute
        path="/storage/create"
        authorized={!isLoaded || (user && user.role === 'landlord')}
        redirect="/signUp"
        render={(props) => <StorageCreateView {...props} />}
      />
      <ProtectedRoute
        path="/storage/:id/manage"
        authorized={!isLoaded || (user && user.role === 'landlord')}
        redirect="/signUp"
        render={(props) => <StorageManagementView {...props} />}
      />
      <ProtectedRoute
        path="/storage/list"
        authorized={!isLoaded || user}
        redirect="/signUp"
        render={(props) => <StorageListView {...props} user={user} />}
      />
      <ProtectedRoute
        path="/storage/:id"
        authorized={!isLoaded || user}
        redirect="/signUp"
        render={(props) => <StorageView {...props} />}
      />
      <Route exact path="/" component={HomeView} />
    </Switch>
  );
}
