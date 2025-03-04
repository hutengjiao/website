# Angular基础知识

## 1. 双向数据绑定
- 使用 `[(ngModel)]` 实现表单控件的双向绑定
- 需要在模块中导入 `FormsModule`

```typescript
// app.module.ts
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule]
})
```

```html
<!-- 双向绑定示例 -->
<input [(ngModel)]="userName" />
<p>你好, {{userName}}!</p>
```

## 2. 单向数据绑定
- 插值表达式 `{{}}`
- 属性绑定 `[]`

```html
<!-- 插值表达式 -->
<h1>{{title}}</h1>

<!-- 属性绑定 -->
<img [src]="imageUrl">
<button [disabled]="isDisabled">点击</button>
```

## 3. 事件绑定
- 使用 `()` 语法绑定事件
- 可以访问 `$event` 对象

```html
<button (click)="onClick($event)">点击我</button>
<input (input)="onInput($event)">
```

```typescript
export class MyComponent {
  onClick(event: any) {
    console.log('按钮被点击', event);
  }
  
  onInput(event: any) {
    console.log('输入值：', event.target.value);
  }
}
```

## 4. 属性绑定
- 使用 `[属性名]` 语法
- 支持类绑定和样式绑定

```html
<!-- 类绑定 -->
<div [class.active]="isActive">
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">

<!-- 样式绑定 -->
<div [style.color]="textColor">
<div [ngStyle]="{'color': textColor, 'font-size': fontSize + 'px'}">
```

## 5. 管道
- 用于转换显示数据
- Angular内置多个常用管道

```html
<!-- 日期管道 -->
<p>今天是: {{today | date:'yyyy-MM-dd'}}</p>

<!-- 货币管道 -->
<p>价格: {{price | currency:'CNY':'symbol'}}</p>

<!-- 自定义管道 -->
<p>{{text | myCustomPipe}}</p>
```

## 6. 模板语法
- 条件渲染 `*ngIf`
- 列表渲染 `*ngFor`
- 开关语句 `[ngSwitch]`

```html
<!-- 条件渲染 -->
<div *ngIf="showContent">
  这是条件显示的内容
</div>

<!-- 列表渲染 -->
<ul>
  <li *ngFor="let item of items; let i = index">
    {{i + 1}}. {{item.name}}
  </li>
</ul>

<!-- Switch语句 -->
<div [ngSwitch]="status">
  <p *ngSwitchCase="'success'">成功</p>
  <p *ngSwitchCase="'error'">错误</p>
  <p *ngSwitchDefault>默认状态</p>
</div>
```

## 7. 组件通信
- `@Input()` 接收输入属性
- `@Output()` 发送事件到父组件
- `@ViewChild()` 访问子组件

```typescript
// 子组件
@Component({
  selector: 'app-child',
  template: `
    <div>
      <h2>{{title}}</h2>
      <button (click)="sendMessage()">发送消息</button>
    </div>
  `
})
export class ChildComponent {
  @Input() title: string;
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit('来自子组件的消息');
  }
}
```

```html
<!-- 父组件模板 -->
<app-child
  [title]="parentTitle"
  (messageEvent)="handleMessage($event)">
</app-child>
```

## 8. ViewChild示例

### 8.1 使用@ViewChild装饰器
```typescript
// 子组件
@Component({
  selector: 'app-child',
  template: `
    <div>子组件内容</div>
  `
})
export class ChildComponent {
  childMethod() {
    console.log('这是子组件的方法');
  }
}

// 父组件
@Component({
  selector: 'app-parent',
  template: `
    <app-child></app-child>
    <button (click)="callChildMethod()">调用子组件方法</button>
  `
})
export class ParentComponent implements AfterViewInit {
  @ViewChild(ChildComponent) childComponent: ChildComponent;

  ngAfterViewInit() {
    // 访问子组件
    this.childComponent.childMethod();
  }

  callChildMethod() {
    this.childComponent.childMethod();
  }
}
```

### 8.2 使用模板引用变量
```typescript
// 子组件
@Component({
  selector: 'app-child',
  template: `
    <div>子组件内容</div>
  `
})
export class ChildComponent {
  childMethod() {
    console.log('这是子组件的方法');
  }
}

// 父组件
@Component({
  selector: 'app-parent',
  template: `
    <app-child #childRef></app-child>
    <button (click)="childRef.childMethod()">直接调用子组件方法</button>
  `
})
export class ParentComponent {
  // 不需要额外的代码，直接通过模板引用变量访问子组件
}
```

这种方式相比 @ViewChild:
- 更简单直接，不需要在组件类中声明变量
- 可以直接在模板中访问子组件的公共属性和方法
- 适用于简单的父子组件交互场景

## 9. 服务与依赖注入
- 使用 `@Injectable()` 创建服务
- 在构造函数中注入服务

```typescript
// 服务定义
@Injectable({
  providedIn: 'root'
})
export class DataService {
  getData() {
    return ['数据1', '数据2', '数据3'];
  }
}

// 组件中使用服务
@Component({...})
export class MyComponent {
  constructor(private dataService: DataService) {
    const data = this.dataService.getData();
  }
}
```

## 10. 生命周期钩子
- 常用的生命周期钩子及其执行顺序

```typescript
@Component({...})
export class MyComponent implements OnInit, OnDestroy {
  ngOnInit() {
    console.log('组件初始化');
  }

  ngOnDestroy() {
    console.log('组件销毁');
  }
}
```

## 11. 响应式表单
```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
      <!-- 基本字段 -->
      <div>
        <input formControlName="username" placeholder="用户名">
        <div *ngIf="myForm.get('username').errors?.required && myForm.get('username').touched">
          用户名是必填项
        </div>
      </div>

      <!-- 嵌套表单组 -->
      <div formGroupName="address">
        <input formControlName="street" placeholder="街道">
        <input formControlName="city" placeholder="城市">
      </div>

      <!-- 动态表单数组 -->
      <div formArrayName="phones">
        <div *ngFor="let phone of phoneForms.controls; let i=index">
          <input [formControlName]="i" placeholder="电话号码">
          <button type="button" (click)="removePhone(i)">删除</button>
        </div>
        <button type="button" (click)="addPhone()">添加电话</button>
      </div>

      <button type="submit" [disabled]="!myForm.valid">提交</button>
    </form>
  `
})
export class ReactiveFormComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      address: this.fb.group({
        street: [''],
        city: ['']
      }),
      phones: this.fb.array([])
    });

    // 监听表单值变化
    this.myForm.valueChanges.subscribe(value => {
      console.log('表单值变化:', value);
    });
  }

  get phoneForms() {
    return this.myForm.get('phones') as FormArray;
  }

  addPhone() {
    this.phoneForms.push(this.fb.control(''));
  }

  removePhone(index: number) {
    this.phoneForms.removeAt(index);
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    }
  }
}
```

## 12. HTTP服务
```typescript
// 服务定义
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  // GET请求
  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`)
      .pipe(
        retry(3), // 失败时重试3次
        catchError(this.handleError)
      );
  }

  // POST请求
  createData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/data`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 错误处理
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '发生未知错误!';
    if (error.error instanceof ErrorEvent) {
      // 客户端错误
      errorMessage = `错误: ${error.error.message}`;
    } else {
      // 服务器错误
      errorMessage = `服务器返回代码: ${error.status}, 错误信息: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}

// 组件中使用
@Component({...})
export class MyComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData().subscribe({
      next: (data) => console.log('数据:', data),
      error: (error) => console.error('错误:', error),
      complete: () => console.log('请求完成')
    });
  }
}
```

## 13. NgRx Store状态管理
```typescript
// 1. 定义Actions
export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');

// 2. 定义State接口
export interface State {
  count: number;
}

// 3. 定义初始状态
export const initialState: State = {
  count: 0
};

// 4. 创建Reducer
export const counterReducer = createReducer(
  initialState,
  on(increment, state => ({ ...state, count: state.count + 1 })),
  on(decrement, state => ({ ...state, count: state.count - 1 })),
  on(reset, state => ({ ...state, count: 0 }))
);

// 5. 创建Selector
export const selectCount = (state: State) => state.count;

// 6. 组件中使用
@Component({
  selector: 'app-counter',
  template: `
    <button (click)="increment()">+</button>
    <span>{{ count$ | async }}</span>
    <button (click)="decrement()">-</button>
    <button (click)="reset()">Reset</button>
  `
})
export class CounterComponent {
  count$ = this.store.select(selectCount);

  constructor(private store: Store<{ count: number }>) {}

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
```

## 14. 路由导航
```typescript
// 路由配置
const routes: Routes = [
  { 
    path: 'products',
    component: ProductListComponent,
    children: [
      { path: ':id', component: ProductDetailComponent }
    ],
    canActivate: [AuthGuard]
  },
  { 
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AdminGuard]
  }
];

// 路由守卫示例
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

// 组件中的路由导航
@Component({...})
export class NavigationComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // 编程式导航
  goToProduct(id: number) {
    this.router.navigate(['/products', id], {
      queryParams: { source: 'navbar' },
      fragment: 'top'
    });
  }

  // 获取路由参数
  ngOnInit() {
    // 获取URL参数
    this.route.params.subscribe(params => {
      const id = params['id'];
    });

    // 获取查询参数
    this.route.queryParams.subscribe(params => {
      const source = params['source'];
    });
  }
}
```

