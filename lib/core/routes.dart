import 'package:flutter/material.dart';
import '../screens/auth/login_screen.dart';
import '../screens/user/user_dashboard.dart';

class Routes {
  static const login = "/";
  static const userDashboard = "/user-dashboard";

  static Map<String, WidgetBuilder> routes = {
    login: (context) => const LoginScreen(),
    userDashboard: (context) => const UserDashboard(),
  };
}