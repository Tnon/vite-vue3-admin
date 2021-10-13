import overview from "@/router/modules/overview";
import attack from "@/router/modules/attack";
import risk from "@/router/modules/risk";
import asset from "@/router/modules/asset";
import strategy from "@/router/modules/strategy";
import log from "@/router/modules/log";
import report from "@/router/modules/report";
import user from "@/router/modules/user";
import setting from "@/router/modules/setting";
import avatar from "@/router/modules/avatar";
export default [
    ...overview,
    ...attack,
    ...risk,
    ...asset,
    ...strategy,
    ...log,
    ...report,
    ...user,
    ...setting,
    ...avatar
]
