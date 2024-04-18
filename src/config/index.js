import dev from './dev';
import staging from './staging';
import prd from './prd';

// const config = { dev, staging, prd }[process.env.REACT_APP_ENV]
const config = { dev, staging, prd }

export { config }