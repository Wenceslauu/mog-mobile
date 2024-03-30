import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";

import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);

dayjs.extend(localizedFormat);

dayjs.extend(duration)

// dayjs.locale("pt-br");

export default dayjs;
