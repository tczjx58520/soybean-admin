<template>
  <div>
    <n-data-table v-bind="$attrs" remote :columns="columns" :data="data" :pagination="pagination" />
  </div>
</template>

<script setup lang="ts">
import { $t } from '@/locales';
import useHookTable from '@/hooks/business/use-hook-table';
defineOptions({ name: 'NwowTable' });
/**
 * 表格组件
 * - 基于n-data-table封装，支持Json Schema格式生成表头
 * - 同时封装了分页行为
 */
interface Props {
  /** JsonSchema */
  schema: object;
  /** 请求数据Promise */
  apiFun: void;
  /** 请求数据Promise的参数 */
  apiParams?: object;
  /** 操作函数 */
  actionColumns?: object;
}

interface columnItem {
  title: string;
  key: string | number;
}

const props = defineProps<Props>();
const ColumnsFun = () => {
  // 获取表头值
  const keyArr = Object.keys(props.schema.properties);
  let columnsTemp: columnItem[] = keyArr.map((item: string) => {
    const cItem: columnItem = {
      title: $t(props.schema.properties[item].title),
      key: item
    };
    // 若表单信息里面有自定义渲染函数
    if (props.schema.properties[item]['table:options'] && props.schema.properties[item]['table:options'].render) {
      const render = props.schema.properties[item]['table:options'].render;
      cItem.render = render;
    }
    return cItem;
  });
  if (props.actionColumns) {
    columnsTemp = columnsTemp.concat(props.actionColumns);
  }
  return columnsTemp;
};
const transformerFun = data => {
  return {
    data: data.list,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    total: Number(data.totalCount)
  };
};
const apiParamsUpdaterFun = data => {
  // 将page字段转换成pageNum
  // 删除多余page字段
  const temp = {
    ...data,
    pageNum: data.page
  };
  delete temp.page;
  return {
    ...temp,
    pageNum: data.page,
    pageSize: data.pageSize
  };
};
const { columns, data, pagination } = useHookTable(props.apiFun, {
  // 接口请求查询参数
  apiParams: props.apiParams,
  // 表头生成函数
  columns: ColumnsFun,
  // 接口返回数据转换函数
  transformer: transformerFun,
  // 查询参数更新函数
  apiParamsUpdater: apiParamsUpdaterFun
  // pagination若需要更改分页默认配置参数则需要传递，详情见use-hook-table
});
</script>

<style scoped></style>
