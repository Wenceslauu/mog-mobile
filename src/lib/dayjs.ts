import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);

dayjs.extend(localizedFormat);

// dayjs.locale("pt-br");

export default dayjs;
