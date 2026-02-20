import 'package:flutter/material.dart';
import 'core/theme.dart';
import 'core/routes.dart';

void main() {
  runApp(const PashudrishtiApp());
}

class PashudrishtiApp extends StatelessWidget {
  const PashudrishtiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Pashudrishti',
      theme: AppTheme.lightTheme,
      initialRoute: Routes.login,
      routes: Routes.routes,
    );
  }
}