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
import AllStorages from '../views/AllStorages';
import PaymentView from '../views/Payment';
import ConfirmationView from '../views/Confirmation';

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
        render={(props) => (
          <ProfileView {...props} loadUser={props.loadUser} user={user} />
        )}
      />
      <ProtectedRoute
        path="/settings"
        authorized={isLoaded && user}
        redirect="/signIn"
        render={(props) => (
          <SettingsView {...props} onEditUser={handleEditUser} />
        )}
      />
      <Route exact path="/storage/all" component={AllStorages} />
      <ProtectedRoute
        path="/storage/create"
        authorized={!isLoaded || (user && user.role === 'landlord')}
        redirect="/signUp"
        render={(props) => <StorageCreateView {...props} />}
      />

      <ProtectedRoute
        path="/storage/list"
        authorized={!isLoaded || user}
        redirect="/signUp"
        render={(props) => <StorageListView {...props} user={user} />}
      />
      <ProtectedRoute
        path="/storage/:id/manage"
        authorized={!isLoaded || (user && user.role === 'landlord')}
        redirect="/signUp"
        render={(props) => <StorageManagementView {...props} />}
      />
      <ProtectedRoute
        path="/storage/:id"
        authorized={!isLoaded || user}
        redirect="/signUp"
        render={(props) => <StorageView {...props} user={user} />}
      />
      <ProtectedRoute
        path="/payment"
        authorized={!isLoaded || user}
        redirect="/signUp"
        render={(props) => <PaymentView {...props} user={user} />}
      />
      <Route
        exact
        path="/"
        render={(props) => <HomeView {...props} user={user} />}
      />
      <ProtectedRoute
        path="/confirmation/:type/:storageId"
        authorized={!isLoaded || user}
        redirect="/signUp"
        render={(props) => <ConfirmationView {...props} />}
      />
    </Switch>
  );
}
