import { Routes } from '@angular/router';

import { Users } from './pages/users/users';

import { Settings } from './pages/settings/settings';
import { Component } from '@angular/core';

export const routes = [
  { path: 'users', component: Users },
  { path: 'settings', component: Settings}
];
