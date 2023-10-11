<template>
  <div>
    <h1>封装表单</h1>
    <n-card>
      <nwow-form v-model="formData" :schema="schema"></nwow-form>
    </n-card>

    <h1>封装表格</h1>
    <n-card>
      <nwow-table
        :schema="schema"
        :api-fun="getList"
        :api-params="apiParams"
        :action-columns="actionColumns"
      ></nwow-table>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import { NButton, NPopconfirm, NSpace, NTag } from 'naive-ui';
import { getList } from '@/service/api/auth';
const formData = ref({});
const schema = {
  type: 'object',
  required: ['userName', 'age'],
  properties: {
    rated_current: {
      type: 'string',
      title: '用户名',
      default: 'Liu.Jun',
      'table:options': {
        render: () => {
          return <NTag>自定义渲染值</NTag>;
        }
      }
    },
    rated_voltage: {
      type: 'number',
      title: '年龄',
      default: 1,
      'ui:options': {
        style: {
          width: '100%'
        }
      }
    },
    url: {
      type: 'string',
      title: '签名',
      minLength: 10,
      default: '知道的越多、就知道的越少',
      'ui:options': {
        placeholder: '请输入你的签名',
        type: 'textarea',
        rows: 1
      }
    }
  }
};
// 传递查询参数分页
const apiParams = {
  pageNum: 1
  // (若查询一页数量为10可不传递pageSize)
  // pageSize: 5 查询一页数量不为10则需要传递
  // 可在此处添加请求需要的额外参数
  // type: 1
};
function handleEditTable(rowId: string) {
  const findItem = tableData.value.find(item => item.id === rowId);
  if (findItem) {
    setEditData(findItem);
  }
  setModalType('edit');
  openModal();
}

function handleDeleteTable(rowId: string) {
  window.$message?.info(`点击了删除，rowId为${rowId}`);
}
const actionColumns = [
  {
    key: 'actions',
    title: '操作',
    align: 'center',
    render: row => {
      return (
        <NSpace justify={'center'}>
          <NButton size={'small'} onClick={() => handleEditTable(row.id)}>
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDeleteTable(row.id)}>
            {{
              default: () => '确认删除',
              trigger: () => <NButton size={'small'}>删除</NButton>
            }}
          </NPopconfirm>
        </NSpace>
      );
    }
  }
];
</script>

<style scoped></style>
