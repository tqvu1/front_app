import React from 'react';
import { RouteObject } from 'react-router-dom';

export interface IRouter extends RouteObject {
  requiredAuth?: boolean;
  restricted?: boolean;
  redirect?: boolean;
  redirectPath?: string;
  title?: React.ReactNode;
  children?: IRouter[];
}