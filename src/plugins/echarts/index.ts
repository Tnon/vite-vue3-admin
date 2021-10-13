import * as echarts from 'echarts/core';

import { LineChart, PieChart } from 'echarts/charts';

import {
    TooltipComponent,
    GridComponent,
} from 'echarts/components';

import { SVGRenderer } from 'echarts/renderers';

echarts.use([
    TooltipComponent,
    GridComponent,
    LineChart,
    PieChart,
    SVGRenderer,
]);

export default echarts;
