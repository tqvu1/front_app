import NotFound, { PATH as NOT_FOUND } from './NotFound';
import InternalServer, { PATH as INTERNAL_SERVER } from './InternalServer';
import Forbidden, { PATH as FORBIDDEN } from './Forbidden';

export default { NotFound, InternalServer, Forbidden };
export const PATH = { NOT_FOUND, INTERNAL_SERVER, FORBIDDEN };
