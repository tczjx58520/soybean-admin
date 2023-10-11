import { createApp } from 'vue';
// 配合表单组件的录入组件需要全局引入
import {
  create,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NCheckbox,
  NDatePicker,
  NRadio,
  NRate,
  NSelect,
  NSlider,
  NSwitch,
  NTimePicker
} from 'naive-ui';
import App from './App.vue';
import AppLoading from './components/common/app-loading.vue';
import { setupDirectives } from './directives';
import { setupRouter } from './router';
import { setupAssets } from './plugins';
import { setupStore } from './store';
import { setupI18n } from './locales';

async function setupApp() {
  // import assets: js、css
  setupAssets();

  // app loading
  const appLoading = createApp(AppLoading);

  appLoading.mount('#appLoading');

  const app = createApp(App);

  // store plugin: pinia
  setupStore(app);

  // vue custom directives
  setupDirectives(app);

  // vue router
  await setupRouter(app);

  setupI18n(app);

  const naive = create({
    components: [
      NButton,
      NForm,
      NFormItem,
      NInput,
      NInputNumber,
      NCheckbox,
      NDatePicker,
      NRadio,
      NRate,
      NSelect,
      NSlider,
      NSwitch,
      NTimePicker
    ]
  });
  app.use(naive);
  appLoading.unmount();

  // mount app
  app.mount('#app');
}

setupApp();
