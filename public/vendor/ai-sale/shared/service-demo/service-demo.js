(function () {
  const avatarBase = '../shared/assets/avatars/';
  const pageParams = new URLSearchParams(window.location.search);
  const isEmbedded = pageParams.get('embed') === '1';

  function sceneHref(path) {
    return isEmbedded ? path + (path.includes('?') ? '&' : '?') + 'embed=1' : path;
  }

  const sceneLinks = [
    { id: 'visit', name: '售前：参观接待 / 试菜群', href: sceneHref('../scene-13-service-ai/index.html?scenario=visit-tasting'), color: '#8B5CF6', icon: 'chef-hat' },
    { id: 'delivery', name: '售后：已成交未安装', href: sceneHref('../scene-14-delivery-install-training/index.html'), color: '#2563EB', icon: 'truck' },
    { id: 'warranty', name: '售后：成交客户质保期内', href: sceneHref('../scene-15-warranty-service/index.html'), color: '#10B981', icon: 'shield-check' },
    { id: 'outWarranty', name: '售后：质保期外 / 过保', href: sceneHref('../scene-16-out-of-warranty-service/index.html'), color: '#F59E0B', icon: 'radar' },
    { id: 'sales', name: '销售：销售过程', href: sceneHref('../scene-17-sales-process/index.html'), color: '#EC4899', icon: 'line-chart' }
  ];

  const roleMeta = {
    customer: { avatar: '客', img: avatarBase + 'customer-owner.png', own: false },
    sales: { avatar: '销', img: avatarBase + 'sales-male.png', own: true },
    business: { avatar: '商', img: avatarBase + 'business-xinglan.png', own: true },
    delivery: { avatar: '交', img: avatarBase + 'delivery-coordinator.png', own: true },
    service: { avatar: '售', img: avatarBase + 'service-supervisor.png', own: true },
    engineer: { avatar: '工', img: avatarBase + 'service-engineer.png', own: true },
    chef: { avatar: '厨', img: avatarBase + 'chef-liu.png', own: true },
    ai: { avatar: 'AI', own: true }
  };

  const insightDefs = [
    { id: 'profile', title: '用户画像', sub: '客户阶段 / 情绪 / 经营诉求', icon: 'contact-round', color: '#2563EB' },
    { id: 'workflow', title: 'OA 流程', sub: '安装 / 培训 / 费用确认', icon: 'workflow', color: '#10B981' },
    { id: 'ticket', title: '工单', sub: '售后事件 / 负责人 / 时限', icon: 'clipboard-check', color: '#F43F5E' },
    { id: 'product', title: '产品建议', sub: '配件 / 参数 / 使用建议', icon: 'package-check', color: '#8B5CF6' },
    { id: 'quality', title: '质量分析', sub: '故障归因 / 重复问题', icon: 'chart-column', color: '#F59E0B' },
    { id: 'next', title: '下一步建议', sub: '回复口径 / 销售或售后动作', icon: 'route', color: '#06B6D4' }
  ];

  const emptyText = {
    profile: '等待客户、门店、阶段、情绪和经营诉求进入画像。',
    workflow: '等待 AI 把聊天信息映射到 OA 流程节点。',
    ticket: '等待故障、安装、培训或费用事件生成工单草稿。',
    product: '等待识别配件、设备型号、菜谱参数或产品改进建议。',
    quality: '等待沉淀故障原因、重复问题和质量分析线索。',
    next: '等待更多上下文后生成销售/售后的下一步动作。'
  };

  const connectorLabels = {
    oa: { title: 'OA', copy: '流程草稿', icon: 'workflow' },
    ticket: { title: '工单', copy: '服务任务', icon: 'clipboard-check' },
    crm: { title: 'CRM', copy: '客户档案', icon: 'contact-round' },
    mall: { title: '商城', copy: '配件购买', icon: 'shopping-bag' }
  };

  const profilePresets = {
    delivery: {
      person: { name: '王总', title: '华东餐饮 负责人', wechat: '企业微信已添加', avatar: avatarBase + 'customer-owner.png' },
      business: [['业态', '连锁快餐'], ['总部', '杭州'], ['门店', '12 家门店'], ['常用菜', '辣炒黄牛肉、青椒肉丝、宫保鸡丁']],
      roles: [
        { key: 'owner', label: '老板', name: '王总', focus: '交付进度、开业时间、投入产出', traits: ['拍板快', '关注准时交付', '重视售后响应'] },
        { key: 'chef', label: '总厨', name: '郑老师', focus: '菜谱参数、口味稳定、员工实操', traits: ['关注出品一致性', '会提参数建议', '愿意现场指导'] },
        { key: 'buyer', label: '采购', name: '李经理', focus: '到货验收、配件备货、费用确认', traits: ['关注物流单号', '重视备件库存', '需要流程清晰'] }
      ]
    },
    warranty: {
      person: { name: '王总', title: '恒隆广场店 店主', wechat: '企业微信 · 售后群沟通中', avatar: avatarBase + 'customer-owner.png' },
      business: [['业态', '商场快餐门店'], ['总部', '上海'], ['门店', '3 家门店'], ['常用菜', '生抽类快炒、盖浇饭、青椒肉丝']],
      roles: [
        { key: 'owner', label: '老板', name: '王总', focus: '设备恢复、投诉风险、停业影响', traits: ['对重复故障敏感', '希望一次解决', '关注响应速度'] },
        { key: 'chef', label: '总厨', name: '门店厨师长', focus: '下料稳定、出餐节奏、故障排查', traits: ['熟悉人工兜底', '能配合测试', '关注口味稳定'] },
        { key: 'buyer', label: '采购', name: '门店行政', focus: '配件型号、备件库存、服务记录', traits: ['需要明确负责人', '关注维修闭环', '保存服务单据'] }
      ]
    },
    outWarranty: {
      person: { name: '肖总', title: '过保门店负责人', wechat: '企业微信 · 过保服务群', avatar: avatarBase + 'customer-owner.png' },
      business: [['业态', '正餐 / 单店经营'], ['总部', '广州'], ['门店', '1 家门店'], ['常用菜', '小炒黄牛肉、蒸菜、家常快炒']],
      roles: [
        { key: 'owner', label: '老板', name: '肖总', focus: '费用是否合理、配件怎么买、是否上门', traits: ['费用敏感', '希望先自助解决', '遇到质保争议会追问'] },
        { key: 'chef', label: '总厨', name: '门店厨师', focus: '漏水影响清洁、不下料影响出品', traits: ['能描述故障现象', '关注可否自行更换', '需要图文指导'] },
        { key: 'buyer', label: '采购', name: '采购/店长', focus: '商城链接、配件型号、发票记录', traits: ['需要正确 SKU', '关注是否买错型号', '会追踪到货'] }
      ]
    },
    sales: {
      person: { name: '张总', title: '区域快餐连锁 负责人', wechat: '企业微信 · 销售沟通中', avatar: avatarBase + 'customer-owner.png' },
      business: [['业态', '连锁快餐'], ['总部', '杭州'], ['门店', '6 家门店'], ['常用菜', '鱼香肉丝、青椒肉丝、盖饭小炒']],
      roles: [
        { key: 'owner', label: '老板', name: '张总', focus: '投入产出、回本周期、扩店复制', traits: ['价格敏感', '重视 ROI', '愿意试菜验证'] },
        { key: 'chef', label: '总厨', name: '陈师傅', focus: '出品口味、菜谱参数、午高峰节奏', traits: ['关注锅气口味', '会带菜品测试', '重视稳定性'] },
        { key: 'buyer', label: '采购', name: '财务/采购', focus: '报价、合同、付款和发票', traits: ['需要正式报价', '关注服务范围', '希望流程清晰'] }
      ]
    },

    salesScene: {
      color: '#EC4899',
      pageTitle: '星环烹云销售 AI 助手 · 销售过程 Demo',
      navTitle: '星环烹云销售 AI 助手 · 销售过程 Demo',
      navSubtitle: '从客户询价、需求追问、价值测算到试菜预约，AI 在后台辅助销售推进。',
      title: '销售过程：需求识别、方案推荐、异议处理、下一步推进',
      subtitle: '销售真人在企微群中沟通，AI 同步抽取客户画像、需求、竞品异议和 CRM 跟进任务',
      group: '张总-星环烹云销售沟通群',
      count: '5 人',
      statusText: '销售会话分析中',
      footer: '本页重点：AI 不替销售直接开口，而是把客户需求、价格异议、竞品比较和下一步动作沉淀到 CRM / OA，给销售可确认发送的建议。',
      contextNote: '销售过程里，客户需求、价格异议、试菜时间和报价测算常散落在多轮聊天中，销售容易漏记关键承诺。AI 会提取采购信号和下一步动作，并自动同步到 CRM 跟进。',
      messages: [
        {
          role: 'sales',
          name: '销售 陈峰',
          time: '09:42',
          text: '张总您好，我是星环烹云陈峰。看到您在官网留了智能炒菜设备的咨询，我先不发一大堆资料，想简单了解下：您现在是已有门店想升级后厨，还是准备新开店？',
          extract: 'profile',
          log: ['识别销售主动承接官网线索', 'AI 建议：先问场景，不直接报价', 'CRM 创建初始销售沟通记录'],
          updates: {
            profile: { status: '初始画像', fields: [['客户来源', '官网留资'], ['客户阶段', '线索接入 / 初次沟通'], ['待补字段', '业态、门店数、日单量、预算']], tags: ['新线索', '销售承接', '待需求确认'] },
            workflow: { status: 'CRM 已建档', fields: [['流程', '线索承接'], ['节点', '初次沟通'], ['策略', '先问场景再给方案']] },
            tasks: [{ type: 'CRM', name: '官网线索承接', desc: '张总咨询智能炒菜设备，销售已开始企微沟通，需补全业态、门店规模和需求。', owner: '销售 陈峰', status: '待确认' }],
            connectors: ['crm']
          }
        },
        {
          role: 'customer',
          name: '客户 张总',
          time: '09:45',
          text: '我们是做快餐连锁的，杭州这边有 6 家店。主要想看看能不能替一个炒锅师傅，也想先了解大概多少钱。',
          extract: 'profile',
          log: ['抽取客户业态：连锁快餐', '抽取规模：杭州 6 家门店', '识别核心诉求：替代炒锅师傅、价格关注'],
          updates: {
            profile: { status: '画像补全', fields: [['业态', '连锁快餐'], ['门店', '杭州 6 家'], ['核心诉求', '替代炒锅师傅，关注价格']], tags: ['连锁快餐', '价格关注', '人效诉求'] },
            ticket: { status: '销售任务', fields: [['类型', '需求确认任务'], ['待确认', '日单量、菜品结构、人工成本'], ['优先级', '高意向']] },
            tasks: [{ type: 'CRM', name: '客户画像补全', desc: '补充日单量、后厨人数、主力菜品和当前人工成本，用于后续选型与 ROI 测算。', owner: '销售 陈峰', status: '待确认' }]
          }
        },
        {
          role: 'sales',
          name: '销售 陈峰',
          time: '09:47',
          text: '明白，快餐连锁确实比较适合先判断人效和高峰出餐。价格会和型号、配置、菜品结构有关，我先了解两个关键点：单店一天大概多少单？炒锅师傅一个月大概多少钱？',
          extract: 'next',
          log: ['AI 识别销售采用需求澄清话术', '避免客户进入单纯比价模式', '下一步需要收集 ROI 测算参数'],
          updates: {
            next: { status: '已生成', fields: [['话术策略', '先认可，再追问经营数据'], ['待补参数', '日单量、人工成本'], ['目的', '为 ROI 和选型做依据']] },
            workflow: { status: '需求确认中', fields: [['阶段', '需求探索'], ['销售动作', '追问单量与人工成本'], ['AI 提醒', '不要过早给固定报价']] }
          }
        },
        {
          role: 'customer',
          name: '客户 张总',
          time: '09:51',
          text: '单店日均 250 到 300 单，中午高峰有点顶不住。炒锅师傅差不多 9000 一个月，我们主要做盖饭和小炒。',
          extract: 'product',
          log: ['抽取日单量：250-300 单', '抽取人工成本：9000 元/月', '抽取菜品：盖饭、小炒', '触发产品选型和 ROI 测算'],
          updates: {
            profile: { status: '高意向', fields: [['单店日单量', '250-300 单'], ['人工成本', '炒锅师傅 9000 元/月'], ['主营菜品', '盖饭、小炒']], tags: ['高峰出餐压力', 'ROI 可测算', 'G3 适配'] },
            product: { status: '可推荐', fields: [['推荐设备', 'G3 标准版'], ['适配原因', '快餐小炒 / 盖饭 / 250-300 单'], ['下一步', '生成轻方案和价值测算']] },
            quality: { status: '价值线索', fields: [['痛点', '午高峰顶不住'], ['经营影响', '出餐节奏与人力依赖'], ['测算参数', '9000 元/月人工成本']] }
          }
        },
        {
          role: 'business',
          name: '商务 星澜',
          time: '09:53',
          text: '已基于客户画像匹配到快餐门店方案、G3 标准版资料、同类案例和 ROI 测算模板，销售可确认后发送。',
          extract: 'workflow',
          log: ['商务星澜关联内部知识库资料', '匹配同类快餐门店成交案例', '生成 CRM 跟进素材包'],
          updates: {
            workflow: { status: '资料匹配', fields: [['知识库', '快餐门店方案'], ['案例', '同类 250-300 单门店'], ['测算', '人工成本 ROI 模板']] },
            tasks: [{ type: 'CRM', name: '销售素材包', desc: '为张总匹配 G3 标准版资料、快餐案例和 ROI 测算模板。', owner: '商务 星澜', status: '预创建' }],
            connectors: ['crm', 'oa']
          }
        },
        {
          role: 'sales',
          name: '销售 陈峰',
          time: '09:56',
          kind: 'salesCard',
          text: '按您这个情况，我建议先看 G3 标准版，不一定马上谈采购，先判断适不适合您店。它主要解决高峰出餐、减少对炒锅师傅依赖和标准菜品稳定这三件事。',
          card: {
            icon: 'file-text',
            title: '快餐门店轻方案',
            rows: [['推荐', 'G3 标准版'], ['适配', '250-300 单 / 盖饭小炒'], ['价值', '高峰出餐更稳，减少炒锅依赖'], ['下一步', '试菜验证 + ROI 测算']]
          },
          extract: 'product',
          log: ['销售发送场景化轻方案', 'AI 抽取推荐设备与价值点', 'CRM 更新客户阶段：产品匹配'],
          updates: {
            product: { status: '方案已生成', fields: [['产品', 'G3 标准版'], ['价值点', '高峰出餐、减少人力依赖、口味稳定'], ['验证方式', '试菜 + ROI 测算']] },
            tasks: [{ type: 'CRM', name: '轻方案发送记录', desc: '记录已向客户发送快餐门店 G3 标准版轻方案，后续跟进试菜和报价。', owner: '销售 陈峰', status: '待确认' }]
          }
        },
        {
          role: 'customer',
          name: '客户 张总',
          time: '10:02',
          text: '我也看了别家的类似设备，价格好像比你们便宜。你们贵在哪里？别最后买回来用不上。',
          extract: 'quality',
          log: ['识别竞品/价格异议', '客户担心投入后闲置', 'AI 建议：不否定竞品，用场景验证和案例回应'],
          updates: {
            quality: { status: '价格异议', fields: [['异议', '竞品更便宜'], ['真实顾虑', '买回来用不上'], ['应对策略', '案例 + 试菜验证 + ROI']] },
            next: { status: '已生成', fields: [['回复策略', '先认可顾虑，再讲适配验证'], ['避免', '直接贬低竞品或急着降价'], ['推进', '邀约试菜和同类案例']] },
            tasks: [{ type: 'CRM', name: '竞品异议记录', desc: '客户提到竞品价格更低，需记录异议并匹配同类案例与试菜验证动作。', owner: '销售 陈峰', status: '待确认' }]
          }
        },
        {
          role: 'sales',
          name: '销售 陈峰',
          time: '10:05',
          text: '张总，您这个顾虑很正常。我们不建议只看纸面价格，重点看三点：能不能稳定做您店里的菜、午高峰能不能扛住、后续安装培训和售后能不能跟上。最好您带厨师长来试两道常做菜，现场看效果更客观。',
          extract: 'next',
          log: ['销售使用 AI 推荐的异议处理话术', '把价格异议转为试菜验证', '创建试菜邀约任务草稿'],
          updates: {
            workflow: { status: '试菜邀约', fields: [['触发原因', '价格/竞品异议'], ['验证内容', '常做菜、午高峰效率、口味稳定'], ['参与人', '客户 + 厨师长']] },
            tasks: [{ type: 'OA', name: '试菜邀约任务', desc: '邀请客户和厨师长到展厅试菜，验证快餐常做菜效果。', owner: '销售 陈峰', status: '待确认' }],
            connectors: ['oa', 'crm']
          }
        },
        {
          role: 'customer',
          name: '客户 张总',
          time: '10:09',
          text: '可以。下周三下午我和厨师长过去，想试鱼香肉丝、青椒肉丝。你们也准备一份大概报价和回本测算吧。',
          extract: 'workflow',
          log: ['抽取试菜时间：下周三下午', '抽取参与人：客户和厨师长', '抽取菜品：鱼香肉丝、青椒肉丝', '识别报价与 ROI 需求'],
          updates: {
            workflow: { status: '待创建', fields: [['试菜时间', '下周三下午'], ['参与人', '张总 + 厨师长'], ['菜品', '鱼香肉丝、青椒肉丝']] },
            ticket: { status: '销售任务', fields: [['任务', '试菜预约 + 报价准备'], ['资料', '报价、ROI 回本测算'], ['负责人', '销售 陈峰 / 厨师 刘师傅']] },
            tasks: [
              { type: 'OA', name: '试菜预约', desc: '下周三下午安排张总和厨师长试鱼香肉丝、青椒肉丝。', owner: '销售 陈峰', status: '待确认' },
              { type: 'CRM', name: '报价与 ROI 准备', desc: '基于 9000 元/月人工成本，准备 G3 标准版报价和回本测算。', owner: '销售 陈峰', status: '预创建' }
            ]
          }
        },
        {
          role: 'sales',
          name: '销售 陈峰',
          time: '10:12',
          text: '好的，我先按下周三下午帮您预留。试菜菜品是鱼香肉丝和青椒肉丝，我会同步厨师按您门店偏快餐出品来准备；报价和回本测算也会一起带过去。',
          extract: 'next',
          log: ['销售确认试菜安排', 'AI 生成可发送回复并写入 CRM 下一步', 'OA 任务进入待确认创建状态'],
          updates: {
            next: { status: '已生成', fields: [['客户回复', '确认时间、菜品和资料准备'], ['内部动作', '同步厨师、准备报价和 ROI'], ['跟进节奏', '试菜后 24 小时内推进报价确认']] },
            reply: { by: '销售 陈峰', text: '张总，收到。我先按下周三下午给您预留试菜时间，参与人是您和厨师长，菜品按鱼香肉丝、青椒肉丝准备。我们会按快餐门店出餐节奏来调试，现场看口味和效率；同时我会带一版 G3 标准版报价和基于 9000 元/月人工成本的回本测算，试菜后我们再一起确认适配方案。' }
          }
        }
      ]
    }
  };

  const salesScene = profilePresets.salesScene;
  delete profilePresets.salesScene;
  profilePresets.sales = {
    person: { name: '张总', title: '区域快餐连锁 负责人', wechat: '企业微信 · 销售沟通中', avatar: avatarBase + 'customer-owner.png' },
    business: [['业态', '连锁快餐'], ['总部', '杭州'], ['门店', '6 家门店'], ['常用菜', '鱼香肉丝、青椒肉丝、盖饭小炒']],
    roles: [
      { key: 'owner', label: '老板', name: '张总', focus: '投入产出、回本周期、扩店复制', traits: ['价格敏感', '重视 ROI', '愿意试菜验证'] },
      { key: 'chef', label: '总厨', name: '陈师傅', focus: '出品口味、菜谱参数、午高峰节奏', traits: ['关注锅气口味', '会带菜品测试', '重视稳定性'] },
      { key: 'buyer', label: '采购', name: '财务/采购', focus: '报价、合同、付款和发票', traits: ['需要正式报价', '关注服务范围', '希望流程清晰'] }
    ]
  };

  const scenes = {
    delivery: {
      color: '#2563EB',
      pageTitle: '星环烹云销售 AI 助手 · 已成交未安装客户 Demo',
      navTitle: '星环烹云销售 AI 助手 · 已成交未安装客户 Demo',
      navSubtitle: '从发货、物流、现场环境、安装到培训，AI 自动预创建 OA 交付流程。',
      title: '已成交未安装客户：发货、安装、培训完整工作流',
      subtitle: '成交后的交付群中，AI 持续抽取物流、施工条件、安装预约和培训记录',
      group: '华东餐饮-星环烹云交付服务群（已成交未安装）',
      count: '9 人',
      statusText: '交付流程监听中',
      footer: '本页重点：AI 把发货、施工环境、安装、培训和回访串成一个 OA 交付流程，减少交付人员漏跟。',
      contextNote: '成交后的交付群往往跨销售、交付、工程师和培训老师多角色协同，物流、安装条件、培训安排任何一步漏跟，都会影响客户开业节奏。AI 会抽取关键节点并提前生成 OA / 工单提醒。',
      messages: [
        {
          role: 'delivery',
          name: '交付 林悦',
          time: '09:02',
          text: '王总，您订购的 G3 智能炒菜机订单已确认。后续发货、物流、安装和培训安排都在这个群里同步，我这边先帮您盯到货节点。',
          extract: 'profile',
          log: ['读取成交客户交付群，识别客户已进入待交付阶段', '建立 OA 交付流程：发货、物流、安装、培训、回访', '同步客户阶段到 CRM：已成交未安装'],
          updates: {
            profile: { status: '已建档', fields: [['客户阶段', '已成交未安装'], ['客户诉求', '希望交付节点清晰'], ['风险点', '发货、安装、培训容易跨人协同']], tags: ['成交客户', '交付中', '需跨部门协同'] },
            workflow: { status: 'OA 草稿', fields: [['流程', '成交交付流程'], ['节点', '发货待确认'], ['协同对象', '销售、交付、售后、培训']] },
            tasks: [{ type: 'OA', name: '成交客户交付流程', desc: '为华东餐饮创建发货、物流、安装、培训一体化 OA 流程。', owner: '交付 林悦', status: '待确认' }],
            connectors: ['oa', 'crm']
          }
        },
        {
          role: 'customer',
          name: '客户 王总',
          time: '09:06',
          text: '我想知道物流单号什么时候出来，门店这边要提前安排人收货。',
          extract: 'workflow',
          log: ['识别客户追问物流单号', '判断当前流程节点：待发货/物流单号待出', '生成提醒：物流单号更新后自动同步群内'],
          updates: {
            workflow: { status: '待发货', fields: [['当前节点', '物流单号待出'], ['客户动作', '安排门店收货'], ['AI 提醒', '单号出现后自动同步']] },
            next: { status: '已生成', fields: [['建议', '先回复物流跟进状态，再承诺到货前提醒'], ['语气', '明确、稳住客户预期']] },
            tasks: [{ type: 'OA', name: '物流单号跟进', desc: '跟进发货状态，物流单号生成后同步客户群并提醒门店收货。', owner: '交付 林悦', status: '待确认' }]
          }
        },
        {
          role: 'delivery',
          name: '交付 林悦',
          time: '09:09',
          kind: 'logistics',
          text: '物流单号已经出来，我把进度卡同步一下。预计 4 月 6 日下午到店，到货后先不要自行拆主机外包装，我们安排工程师上门开箱安装。',
          logistics: {
            title: '设备物流进度',
            rows: [['单号', 'SF973886710'], ['状态', '运输中'], ['预计到店', '4 月 6 日 15:00 前后'], ['提醒', '到货后保留包装，等待工程师开箱']]
          },
          extract: 'workflow',
          log: ['识别物流卡片：单号、运输中、预计到店', '更新 OA 流程节点：已发货/物流中', '生成到货提醒与开箱规则'],
          updates: {
            workflow: { status: '物流中', fields: [['物流单号', 'SF973886710'], ['预计到店', '4 月 6 日 15:00'], ['OA 节点', '已发货 / 等待到店']] },
            tasks: [{ type: 'OA', name: '到货提醒', desc: '设备预计 4 月 6 日下午到店，到货前提醒客户保留包装并等待开箱安装。', owner: '交付 林悦', status: '预创建' }]
          }
        },
        {
          role: 'engineer',
          name: '售后工程师 赵工',
          time: '09:18',
          kind: 'spec',
          text: '安装前我先确认一下现场施工条件。G3 标准 1.6 版需要 380V 三相电，额定功率 15kW，水压 0.2-0.8Mpa，同时确认排水、排烟和设备摆放空间。',
          spec: {
            title: 'G3 标准 1.6 版安装条件',
            rows: [['电源', '380V 三相'], ['功率', '15kW'], ['水压', '0.2-0.8Mpa'], ['尺寸', 'W760*L990*1640mm'], ['容量', '最大可烹饪 4kg'], ['调料', '13 种调料支持']]
          },
          extract: 'workflow',
          log: ['抽取设备安装条件：电源、水压、尺寸、排水排烟', '触发现场环境确认表', 'OA 自动补齐安装前置检查项'],
          updates: {
            workflow: { status: '环境待确认', fields: [['电源', '380V 三相'], ['水压', '0.2-0.8Mpa'], ['待确认', '排水、排烟、摆放空间']] },
            product: { status: '已抽取', fields: [['设备', 'G3 标准 1.6 版'], ['关键参数', '15kW / 380V / 13 种调料'], ['建议', '安装前让客户拍现场照片']] },
            tasks: [{ type: 'OA', name: '现场施工环境确认', desc: '自动生成安装前检查清单：电源、水压、排水、排烟和空间尺寸。', owner: '售后工程师 赵工', status: '待确认' }]
          }
        },
        {
          role: 'customer',
          name: '客户 王总',
          time: '09:23',
          text: '厨房这边水电都预留了，排烟也有。设备到店后我们周三上午比较方便安装，可以一起培训吗？',
          extract: 'workflow',
          log: ['客户确认水电排烟条件', '识别安装时间：周三上午', '识别培训诉求：安装后一起培训'],
          updates: {
            workflow: { status: '安装可预约', fields: [['现场条件', '水电、排烟已预留'], ['安装时间', '周三上午'], ['培训', '希望安装后一起做']] },
            ticket: { status: '工单草稿', fields: [['类型', '安装服务单'], ['时间', '周三上午'], ['附加事项', '安装后培训']] },
            tasks: [{ type: '工单', name: '上门安装工单', desc: '周三上午上门安装 G3，安装完成后衔接培训。', owner: '售后工程师 赵工', status: '待确认' }],
            connectors: ['oa', 'ticket']
          }
        },
        {
          role: 'engineer',
          name: '售后工程师 赵工',
          time: '09:25',
          text: '可以，周三上午我带安装工具和基础备件过去。到店后先开箱验收，再做设备固定、管道接入、调料校准和试运行。',
          extract: 'ticket',
          log: ['售后确认上门时间和作业内容', '工单增加备件和安装步骤', 'OA 安装流程进入待派工确认'],
          updates: {
            ticket: { status: '待派工', fields: [['工程师', '赵工'], ['作业', '开箱验收、固定、管道接入、调料校准'], ['备件', '基础备件随车']] },
            next: { status: '已生成', fields: [['建议', '让客户确认门店联系人和进场时间'], ['下一步', '派工确认后同步培训老师']] }
          }
        },
        {
          role: 'service',
          name: '售后主管 周琳',
          time: '11:40',
          kind: 'training',
          text: '培训计划我同步一下：今天安装完成后先做基础功能和调料校准，明天由店员实操，重点练管道填充、清洗和菜品录入。',
          training: {
            title: '培训工作内容',
            rows: [
              ['1', '调料添加、校准讲解并实操'],
              ['2', '管道填充清洗、调味品更改'],
              ['3', '设备基本功能、注意事项、基本故障排除'],
              ['4', '菜品录入、优大厨 App 菜谱修改'],
              ['5', '收档清洁、锅体清洁、水淀粉管道清洁、养锅']
            ]
          },
          extract: 'workflow',
          log: ['识别培训计划和培训动作', '生成培训签到与培训记录任务', 'OA 流程从安装节点延伸到培训节点'],
          updates: {
            workflow: { status: '培训中', fields: [['培训对象', '门店店员'], ['培训内容', '调料、管道、功能、菜谱、清洁'], ['明日计划', '客户实操熟悉设备']] },
            tasks: [{ type: 'OA', name: '培训记录单', desc: '记录调料校准、管道清洗、故障排除、菜品录入和清洁养锅培训。', owner: '售后主管 周琳', status: '待确认' }]
          }
        },
        {
          role: 'chef',
          name: '厨师 刘师傅',
          time: '14:12',
          text: '今天实操菜品先按辣炒黄牛肉、萧山辣椒菜、三丝本芹、韭黄三丝来做。参数会按客户门店口味调整，完成后我把菜谱记录发群里。',
          extract: 'product',
          log: ['抽取培训菜品：辣炒黄牛肉、萧山辣椒菜、三丝本芹、韭黄三丝', '识别菜谱参数需要沉淀', '同步到产品建议和客户档案'],
          updates: {
            product: { status: '菜谱沉淀', fields: [['菜品', '辣炒黄牛肉、萧山辣椒菜、三丝本芹、韭黄三丝'], ['参数', '按门店口味调整'], ['沉淀', '菜谱记录入档']] },
            profile: { status: '培训中', fields: [['客户阶段', '安装完成 / 培训中'], ['经营诉求', '门店员工尽快上手'], ['口味方向', '偏杭帮与快餐出品']], tags: ['培训中', '门店实操', '关注口味参数'] },
            tasks: [{ type: 'CRM', name: '菜谱参数归档', desc: '将培训菜品和门店口味参数关联到客户档案。', owner: '厨师 刘师傅', status: '预创建' }],
            connectors: ['crm']
          }
        },
        {
          role: 'customer',
          name: '客户 王总',
          time: '15:26',
          text: '郑老师在的时候，大家把问题都提出来，老师给我们进行指导。这个菜建议加一点点酱油，颜色略红一点。',
          extract: 'product',
          log: ['识别客户培训反馈：希望现场集中指导', '识别菜品口味建议：加酱油、颜色略红', '形成产品/菜谱参数优化建议'],
          updates: {
            product: { status: '参数建议', fields: [['客户反馈', '加一点点酱油，颜色略红'], ['适用菜品', '培训菜品参数微调'], ['建议', '同步到优大厨菜谱参数']] },
            quality: { status: '培训反馈', fields: [['反馈类型', '菜谱参数优化'], ['影响范围', '门店出品一致性'], ['沉淀价值', '可复用到同类菜品']] }
          }
        },
        {
          role: 'chef',
          name: '厨师 刘师傅',
          time: '16:05',
          kind: 'photos',
          text: '今天培训照片和菜品过程图已上传，后续可以放到客户交付记录里。',
          photos: {
            caption: '培训留存：设备实操、锅体烹饪、菜品过程图'
          },
          extract: 'quality',
          log: ['识别群内图片/视频素材：培训现场、设备实操、菜品过程', '自动归档到培训交付记录', '形成后续复盘和质量分析素材'],
          updates: {
            quality: { status: '素材归档', fields: [['素材', '设备实操、锅体烹饪、菜品过程图'], ['用途', '培训记录、交付证明、质量复盘'], ['状态', '已关联客户档案']] },
            tasks: [{ type: 'CRM', name: '培训照片归档', desc: '归档培训照片、菜品过程图和现场实操素材。', owner: '交付 林悦', status: '待确认' }]
          }
        },
        {
          role: 'delivery',
          name: '交付 林悦',
          time: '16:18',
          text: '王总，今天安装和第一天培训记录我已经整理。明天继续让店员实操设备、录制编辑菜品，并练习管道填充与清洗。',
          extract: 'next',
          log: ['交付总结已形成', '生成明日培训计划', 'OA 交付流程进入培训跟进节点'],
          updates: {
            next: { status: '已生成', fields: [['明日计划', '店员实操、录制编辑菜品、管道填充与清洗'], ['回访', '培训结束后 24 小时内回访'], ['目标', '让门店自主稳定出品']] },
            reply: { by: '交付 林悦', text: '王总，今天已完成设备安装、开箱验收、调料校准和第一轮培训。我这边已把培训内容、菜品参数和现场照片同步到 OA 交付记录里。明天继续安排店员实操设备、录制编辑菜品，并练习管道填充与清洗，培训完成后我们再做一次出品稳定性回访。' }
          }
        }
      ]
    },

    warranty: {
      color: '#10B981',
      pageTitle: '星环烹云销售 AI 助手 · 质保期内售后 Demo',
      navTitle: '星环烹云销售 AI 助手 · 成交客户质保期内 Demo',
      navSubtitle: 'AI 从大量售后群中捕获报修信息，自动生成保内维修工单并对接 OA。',
      title: '成交客户质保期内：故障识别、派工、维修闭环',
      subtitle: '先从几百个售后群中浮现高优先级报修，再进入客户群完成保内处理',
      group: '恒隆广场店-星环烹云质保服务群',
      count: '11 人',
      statusText: '保内售后群监听中',
      footer: '本页重点：售后不需要人工逐个翻群，AI 从大量未读群中优先浮现故障消息，并预创建保内维修工单。',
      contextNote: '每个售后可能要同时盯几十到几百个服务群，报修、配件和培训消息很容易被淹没。AI 会把关键问题自动提取出来，并及时提醒负责人处理。',
      monitor: {
        total: 326,
        unread: 84,
        surfaced: '7 条高优先级',
        countdown: 18,
        active: 'g1',
        groups: [
          { id: 'g1', title: '恒隆广场店质保服务群', copy: '机器人不会下调料，要求明早到店', unread: 12, tag: '保内报修', active: true },
          { id: 'g2', title: '钱江渔村售后群', copy: '散热风扇油污，需清理建议', unread: 6, tag: '质量线索', urgent: true },
          { id: 'g3', title: '华东餐饮培训群', copy: '菜品参数反馈，建议加酱油', unread: 17, tag: '培训反馈' },
          { id: 'g4', title: '山东新店交付群', copy: '物流已签收，等待安装', unread: 9, tag: '安装待办' },
          { id: 'g5', title: 'CALM售后服务群', copy: '质保状态待核验', unread: 5, tag: '待核验' },
          { id: 'g6', title: '珠海门店服务群', copy: '客户确认已恢复使用', unread: 3, tag: '闭环' }
        ]
      },
      messages: [
        {
          role: 'customer',
          name: '刚刚好',
          time: '10:42',
          text: '@星环售后，恒隆广场店的机器人不会下调料，麻烦你们这边明天早上安排人到店帮忙调试维修一下，谢谢。',
          extract: 'ticket',
          monitorActive: 'g1',
          log: ['AI 从 326 个售后群中捕获高优先级报修', '抽取事件：恒隆广场店、不会下调料、明早上门', '生成保内维修工单草稿并推送售后'],
          updates: {
            profile: { status: '保内客户', fields: [['客户', '恒隆广场店'], ['客户阶段', '成交客户质保期内'], ['诉求', '尽快恢复下调料']], tags: ['质保期内', '影响营业', '需快速响应'] },
            ticket: { status: '待派工', fields: [['故障', '机器人不会下调料'], ['门店', '恒隆广场店'], ['期望时间', '明天早上']] },
            workflow: { status: 'OA 已预填', fields: [['流程', '保内维修流程'], ['节点', '报修受理'], ['SLA', '18 分钟内响应']] },
            tasks: [{ type: '工单', name: '恒隆广场店不下调料维修', desc: '客户反馈机器人不会下调料，要求明早到店调试维修。', owner: '售后主管 周琳', status: '待确认' }],
            connectors: ['ticket', 'oa', 'crm']
          }
        },
        {
          role: 'service',
          name: '售后主管 周琳',
          time: '10:44',
          text: '收到。王总，方便确认一下是哪一路调料不下吗？生抽、老抽、水淀粉还是其他？我们先判断是否需要带泵和接头。',
          extract: 'ticket',
          log: ['售后回复客户并补问故障字段', 'AI 识别需要配件预判：泵、磁吸接头', '工单进入远程排查状态'],
          updates: {
            ticket: { status: '远程排查', fields: [['故障', '不下调料'], ['待补字段', '具体调料路数'], ['备件预判', '蠕动泵、磁吸接头']] },
            product: { status: '配件预判', fields: [['可能配件', '蠕动泵 / 磁吸接头'], ['建议', '上门前确认调料路数'], ['目的', '减少二次上门']] }
          }
        },
        {
          role: 'customer',
          name: '客户 王总',
          time: '10:46',
          text: '生抽一直不下，我们现在都是手动放生抽，前两次也是这么说的，这次能不能彻底解决？',
          extract: 'quality',
          log: ['识别重复故障和客户情绪', '客户关键词：一直手动放、前两次也是、彻底解决', '质量分析卡标记为重复问题风险'],
          updates: {
            profile: { status: '风险升高', fields: [['客户情绪', '对重复故障不满'], ['经营影响', '人工手动加生抽影响效率'], ['期望', '彻底解决']], tags: ['重复故障', '情绪风险', '影响出餐'] },
            quality: { status: '重复问题', fields: [['问题', '生抽不下'], ['历史', '前两次也判断类似'], ['风险', '客户对处理闭环不信任']] },
            next: { status: '已生成', fields: [['回复策略', '先安抚，再说明本次闭环动作'], ['动作', '带备件、记录测试结果、维修后回访']] }
          }
        },
        {
          role: 'engineer',
          name: '售后工程师 赵工',
          time: '10:48',
          text: '王总，麻烦先把生抽盒子取下来，手动投生抽 100g，看一下磁吸接头那里有没有吸力。这个能帮助判断是泵、接头还是管路问题。',
          extract: 'ticket',
          log: ['抽取远程排查动作：手动投生抽 100g', '故障归因范围：泵、接头、管路', '工单增加远程诊断步骤'],
          updates: {
            ticket: { status: '排查中', fields: [['排查动作', '手动投生抽 100g'], ['检查点', '磁吸接头是否有吸力'], ['归因范围', '泵、接头、管路']] },
            product: { status: '诊断建议', fields: [['诊断步骤', '检查磁吸接头吸力'], ['备件', '泵、接头'], ['下一步', '根据客户反馈决定带件']] }
          }
        },
        {
          role: 'customer',
          name: '客户 王总',
          time: '10:52',
          text: '没有吸力。',
          extract: 'ticket',
          log: ['客户反馈无吸力', 'AI 判断泵或接头故障概率升高', '工单自动补齐上门备件'],
          updates: {
            ticket: { status: '需上门', fields: [['客户反馈', '无吸力'], ['高概率原因', '蠕动泵或磁吸接头'], ['处理', '工程师带件上门']] },
            tasks: [{ type: '工单', name: '带件上门维修', desc: '客户反馈生抽路无吸力，工程师带蠕动泵和磁吸接头到店排查更换。', owner: '售后工程师 赵工', status: '待确认' }]
          }
        },
        {
          role: 'service',
          name: '售后主管 周琳',
          time: '10:54',
          text: '王总抱歉，这次我们按重复故障处理。我这边安排赵工明早到店，带泵和接头一起过去，维修后会在群里同步测试结果和后续回访。',
          extract: 'workflow',
          log: ['AI 生成安抚和闭环型回复，售后确认发送', 'OA 流程进入派工确认', 'CRM 记录重复故障风险'],
          updates: {
            workflow: { status: '派工确认', fields: [['上门', '明早到店'], ['备件', '泵、磁吸接头'], ['闭环', '群内同步测试结果并回访']] },
            tasks: [{ type: 'OA', name: '保内上门派工确认', desc: '重复故障按高优先级处理，明早派赵工到恒隆广场店。', owner: '售后主管 周琳', status: '待确认' }],
            reply: { by: '售后主管 周琳', text: '王总抱歉，这次我们按重复故障处理。我这边安排赵工明早到店，带泵和磁吸接头一起过去，现场会完整排查生抽路、泵和管路，维修后把测试结果发群里，并安排一次回访，确保后续不用再手动加生抽。' }
          }
        },
        {
          role: 'engineer',
          name: '售后工程师 赵工',
          time: '次日 09:38',
          text: '我到店了。老板，方便的话再拆开拍一下照片；如果线路确认没问题，我这边会上传日志，让后台判断是不是机芯损坏造成的。',
          extract: 'ticket',
          log: ['现场工程师到店', '识别动作：拍照、确认线路、上传日志', '工单进入现场处理和后台分析节点'],
          updates: {
            ticket: { status: '现场处理中', fields: [['动作', '拆开拍照、确认线路'], ['后台协同', '上传日志分析机芯'], ['状态', '工程师已到店']] },
            workflow: { status: '现场处理', fields: [['OA 节点', '现场维修中'], ['协同', '后台日志分析'], ['证据', '照片、日志']] }
          }
        },
        {
          role: 'engineer',
          name: '售后工程师 赵工',
          time: '次日 11:22',
          text: '这边看了是散热风扇的问题，换了一个风扇目前正常。生抽路也重新测试过，可以正常下料。',
          extract: 'quality',
          log: ['维修结果回传：散热风扇问题', '处理动作：更换风扇，生抽路复测正常', '质量分析沉淀：油污和散热影响机芯/下料稳定性'],
          updates: {
            ticket: { status: '维修完成', fields: [['原因', '散热风扇问题'], ['处理', '更换风扇'], ['复测', '生抽路正常下料']] },
            quality: { status: '已归因', fields: [['故障原因', '散热风扇异常'], ['影响', '设备稳定性和下料表现'], ['建议', '增加清洁保养提醒']] },
            tasks: [{ type: '工单', name: '维修结果闭环', desc: '记录风扇更换、生抽路复测和客户确认，关闭保内维修工单。', owner: '售后工程师 赵工', status: '待确认' }]
          }
        },
        {
          role: 'customer',
          name: '客户 王总',
          time: '次日 11:30',
          text: '散热风扇这边是脏污油污太多了吗？后面我们怎么维护？',
          extract: 'product',
          log: ['客户追问维护原因', '识别培训/保养补充需求', '生成产品使用建议：清洁油污、避免机芯报错'],
          updates: {
            product: { status: '维护建议', fields: [['客户问题', '风扇油污是否导致故障'], ['建议', '定期清理散热区域'], ['补充', '增加清洁培训提醒']] },
            next: { status: '已生成', fields: [['建议', '给客户发清洁保养口径'], ['下一步', '维修后 48 小时回访设备使用情况']] }
          }
        },
        {
          role: 'service',
          name: '售后主管 周琳',
          time: '次日 11:34',
          text: '是的，油污堆积会影响散热，严重时机芯这边会报错。现在可以先正常使用，我们把清理位置和保养频次整理成一条说明发您。',
          extract: 'next',
          log: ['售后回复维护建议', 'AI 生成保养说明和回访任务', 'CRM 记录客户对维护培训的关注'],
          updates: {
            next: { status: '已生成', fields: [['客户回复', '说明油污影响散热'], ['资料', '发送清理位置和频次'], ['回访', '48 小时后确认使用']] },
            tasks: [{ type: 'CRM', name: '维修后回访', desc: '48 小时后回访恒隆广场店，确认下料恢复和清洁保养执行情况。', owner: '售后主管 周琳', status: '预创建' }]
          }
        }
      ]
    },

    outWarranty: {
      color: '#F59E0B',
      pageTitle: '星环烹云销售 AI 助手 · 质保期外售后 Demo',
      navTitle: '星环烹云销售 AI 助手 · 质保期外 / 过保客户 Demo',
      navSubtitle: 'AI 从大量过保售后群中识别配件购买、收费上门、质保争议和延保机会。',
      title: '质保期外客户：多群未读监控、费用协商、商城配件',
      subtitle: 'AI 先把几百个售后群中的高风险问题浮现，再引导过保服务和配件购买闭环',
      group: '肖总-星环烹云售后服务群（过保）',
      count: '7 人',
      statusText: '过保售后群监听中',
      footer: '本页重点：过保客户常涉及费用、配件和质保争议，AI 先核验状态，再辅助售后给出可确认发送的服务方案。',
      monitor: {
        total: 412,
        unread: 137,
        surfaced: '11 条待收费/高风险',
        countdown: 23,
        active: 'o1',
        groups: [
          { id: 'o1', title: '肖总-售后服务群（过保）', copy: '水管漏水，问在哪里买', unread: 18, tag: '配件购买', active: true },
          { id: 'o2', title: 'CALM-服务群（保外待核验）', copy: '不到一年怎么就过保了', unread: 9, tag: '质保争议', urgent: true },
          { id: 'o3', title: '恒隆广场店服务群', copy: '上门是否收费', unread: 6, tag: '费用协商' },
          { id: 'o4', title: '钱江渔村对接群', copy: '菜品参数建议', unread: 17, tag: '低优先' },
          { id: 'o5', title: '华南门店服务群', copy: '蠕动泵型号待确认', unread: 12, tag: '配件型号' },
          { id: 'o6', title: '西南客户延保群', copy: '延保报价待回复', unread: 5, tag: '延保机会' }
        ]
      },
      messages: [
        {
          role: 'customer',
          name: '客户 肖总',
          time: '21:29',
          text: '@售后，水枪的水管坏了漏水，在哪里买？',
          extract: 'ticket',
          monitorActive: 'o1',
          log: ['AI 从 412 个售后群中浮现漏水购买需求', '抽取事件：水枪水管漏水、客户询问购买', '判断：过保客户可优先引导商城自购'],
          updates: {
            profile: { status: '过保客户', fields: [['客户阶段', '质保期外 / 过保'], ['当前诉求', '水枪水管漏水，询问购买'], ['服务策略', '先配件推荐，再说明上门费用']], tags: ['过保客户', '配件购买', '漏水问题'] },
            ticket: { status: '咨询工单', fields: [['问题', '水枪水管漏水'], ['意图', '询问购买渠道'], ['优先级', '中高，影响清洁使用']] },
            workflow: { status: 'OA 草稿', fields: [['流程', '过保服务咨询'], ['节点', '配件推荐'], ['费用', '上门服务费待说明']] },
            tasks: [{ type: '工单', name: '水枪水管漏水咨询', desc: '客户询问水枪水管购买渠道，需推荐正确配件并说明是否可自助更换。', owner: '售后主管 周琳', status: '待确认' }],
            connectors: ['ticket', 'oa', 'crm']
          }
        },
        {
          role: 'service',
          name: '售后主管 周琳',
          time: '21:32',
          kind: 'mall',
          text: '肖总，这个可以在星环配件商城购买，我把新款 1.2 米编织软管链接发您。',
          mall: {
            title: '编织软管（新款 1.2 米）',
            copy: '星环配件商城配件卡 · 适用于水枪软管更换',
            icon: 'waves'
          },
          extract: 'product',
          log: ['识别商城卡片：编织软管（新款 1.2 米）', '关联配件购买记录', '同步到客户过保服务档案'],
          updates: {
            product: { status: '已推荐', fields: [['配件', '编织软管（新款 1.2 米）'], ['渠道', '星环配件商城'], ['注意', '确认接口版本后购买']] },
            tasks: [{ type: '商城', name: '配件购买记录', desc: '记录客户查看编织软管商城卡片，后续可追踪是否购买。', owner: '售后主管 周琳', status: '预创建' }],
            connectors: ['mall']
          }
        },
        {
          role: 'customer',
          name: '客户 肖总',
          time: '21:35',
          text: '这个自己买回来就能换吗？如果要你们上门，是不是要另外收费？',
          extract: 'workflow',
          log: ['客户追问自助更换和上门费用', '识别过保费用协商节点', 'AI 提醒：先讲清自助与上门两种方案'],
          updates: {
            workflow: { status: '费用待确认', fields: [['方案 A', '客户商城自购，自行更换'], ['方案 B', '付费上门，更换并调试'], ['提示', '过保上门需服务费']] },
            next: { status: '已生成', fields: [['回复策略', '先给自助方案，再说明付费上门'], ['风险', '费用表达要清楚，避免误解']] }
          }
        },
        {
          role: 'service',
          name: '售后主管 周琳',
          time: '21:37',
          text: '软管配件可以自行更换。如果现场不方便，我们也可以安排工程师上门；因为设备已过保，上门服务需要收取服务费，我可以先帮您核对设备编号和报价。',
          extract: 'workflow',
          log: ['售后说明自助购买与付费上门差异', 'OA 流程记录费用待确认', 'AI 建议下一步核对设备编号'],
          updates: {
            workflow: { status: '费用说明', fields: [['自助', '商城购买后自行更换'], ['上门', '过保需收服务费'], ['下一步', '核对设备编号和报价']] },
            tasks: [{ type: 'OA', name: '过保上门费用确认', desc: '如客户需要上门，核对设备编号并确认服务费报价。', owner: '售后主管 周琳', status: '待确认' }]
          }
        },
        {
          role: 'customer',
          name: '客户 肖总',
          time: '21:41',
          text: '那再发一个泵的链接吧，我们之前不下调料也怀疑是泵坏了。',
          extract: 'product',
          log: ['客户新增配件需求：泵', '识别关联故障：不下调料', '提示售后先确认型号，避免买错配件'],
          updates: {
            product: { status: '新增配件', fields: [['新增需求', '蠕动泵'], ['关联故障', '不下调料'], ['风险', '需确认型号和接口版本']] },
            quality: { status: '潜在故障', fields: [['故障线索', '不下调料，怀疑泵坏'], ['场景', '过保客户自购配件'], ['建议', '核验型号后再推荐']] }
          }
        },
        {
          role: 'service',
          name: '售后主管 周琳',
          time: '21:43',
          kind: 'mall',
          text: '泵这边先给您看常用型号，购买前建议拍一下设备铭牌和调料门编号，我帮您核对后再下单。',
          mall: {
            title: '蠕动泵（H02YN）',
            copy: '星环配件商城配件卡 · 下单前需核对设备型号',
            icon: 'circle-gauge'
          },
          extract: 'product',
          log: ['商城卡片识别：蠕动泵（H02YN）', 'AI 标记购买风险：型号需核验', '生成设备编号采集任务'],
          updates: {
            product: { status: '待核型号', fields: [['配件', '蠕动泵（H02YN）'], ['下单前', '拍设备铭牌和调料门编号'], ['原因', '避免配件型号买错']] },
            tasks: [{ type: '工单', name: '配件型号核验', desc: '客户购买蠕动泵前，采集设备铭牌和调料门编号核对型号。', owner: '售后主管 周琳', status: '待确认' }]
          }
        },
        {
          role: 'customer',
          name: '客户 肖总',
          time: '21:46',
          text: '这台机器还不到一年怎么就过保了？去年 11 月份买的。',
          extract: 'quality',
          monitorActive: 'o2',
          log: ['客户提出质保争议', 'AI 将事件升级为高风险：费用沟通需谨慎', '建议先核验合同和设备编号，再判断保内或过保'],
          updates: {
            profile: { status: '质保争议', fields: [['客户情绪', '质疑过保判断'], ['客户说法', '去年 11 月购买，不到一年'], ['风险', '直接收费可能引发投诉']], tags: ['过保争议', '费用敏感', '需核验'] },
            quality: { status: '高风险', fields: [['争议点', '客户认为不到一年不应过保'], ['核验', '合同、设备编号、启用日期'], ['建议', '暂不直接收费，先查证']] },
            next: { status: '已生成', fields: [['回复策略', '先安抚并承诺核验'], ['动作', '请客户拍编号，后台查合同/质保']] }
          }
        },
        {
          role: 'service',
          name: '售后主管 周琳',
          time: '21:48',
          text: '肖总，我先帮您查一下，麻烦拍一下水淀粉门那里的编号和设备铭牌。我们核对合同和启用时间，如果还在质保或延保内，就按保内流程处理。',
          extract: 'workflow',
          log: ['售后采用核验优先口径', 'OA 创建质保核验任务', 'CRM 标记延保/保内转化可能'],
          updates: {
            workflow: { status: '质保核验', fields: [['需客户提供', '水淀粉门编号、设备铭牌'], ['后台核验', '合同和启用时间'], ['结果分流', '保内/延保/过保']] },
            tasks: [{ type: 'OA', name: '质保状态核验', desc: '采集设备编号和合同信息，判断保内、延保或过保收费。', owner: '售后主管 周琳', status: '待确认' }],
            connectors: ['oa', 'crm']
          }
        },
        {
          role: 'business',
          name: '商务 星澜',
          time: '21:50',
          text: '后台已同步查询入口：合同信息、设备启用日期、延保状态和商城配件记录都可以关联到这条服务单。',
          extract: 'workflow',
          log: ['商务星澜连接内部系统查询入口', '服务单关联合同、启用日期、延保状态、商城记录', '形成 OA / CRM / 商城闭环'],
          updates: {
            workflow: { status: '系统对接', fields: [['OA', '质保核验流程'], ['CRM', '客户合同和启用日期'], ['商城', '配件购买记录']] },
            tasks: [{ type: 'CRM', name: '延保机会提醒', desc: '若客户已过保，服务完成后可推送延保方案；若在保内，转保内维修流程。', owner: '销售 陈峰', status: '预创建' }]
          }
        },
        {
          role: 'service',
          name: '售后主管 周琳',
          time: '21:54',
          text: '肖总，我这边先不让您直接下单。等编号核对完，我给您确认软管和泵是否匹配；如果保内就转保内维修，如果过保再把自购配件和上门服务两套方案发您确认。',
          extract: 'next',
          log: ['AI 生成谨慎成交口径，售后确认发送', '售后避免客户买错型号和费用争议', '任务进入待客户提供编号状态'],
          updates: {
            next: { status: '已生成', fields: [['回复', '先不直接下单，等编号核对'], ['分流', '保内转维修，过保给两套方案'], ['目标', '降低投诉和买错配件风险']] },
            reply: { by: '售后主管 周琳', text: '肖总，我这边先不让您直接下单，避免配件型号买错。麻烦您拍一下设备铭牌和水淀粉门编号，我马上帮您核对合同、启用时间和配件版本。如果还在质保或延保内，我们按保内维修处理；如果确认过保，我再把商城自购配件和付费上门两套方案发您确认。' }
          }
        }
      ]
    }
  };

  scenes.sales = salesScene;

  const state = {
    scene: null,
    messageIndex: 0,
    playing: true,
    timer: null,
    data: {},
    tasks: [],
    logs: [],
    reply: null,
    sentReplyKey: '',
    connectors: new Set(),
    monitorActive: '',
    activeRole: ''
  };

  const app = document.getElementById('serviceDemoApp');
  const sceneId = window.SERVICE_SCENE_ID || app?.dataset.scene || 'delivery';
  const scene = scenes[sceneId] || scenes.delivery;
  state.scene = scene;
  state.monitorActive = scene.monitor?.active || '';
  document.title = scene.pageTitle;

  app.innerHTML = renderShell(sceneId, scene);

  const els = {
    messages: document.getElementById('messages'),
    monitor: document.getElementById('groupMonitor'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    resetBtn: document.getElementById('resetBtn'),
    stepBtn: document.getElementById('stepBtn'),
    playBtn: document.getElementById('playBtn'),
    taskList: document.getElementById('taskList'),
    taskStatus: document.getElementById('taskStatus'),
    replyBox: document.getElementById('replyBox'),
    replyStatus: document.getElementById('replyStatus'),
    agentLog: document.getElementById('agentLog'),
    connectorFlow: document.getElementById('connectorFlow'),
    toast: document.getElementById('toast')
  };

  function renderShell(activeId, currentScene) {
    const links = sceneLinks.map(link => `
      <a class="scene-link ${link.id === activeId ? 'active' : ''}" style="--scene-color:${link.color}" href="${link.href}">
        <i data-lucide="${link.icon}"></i><span>${escapeHtml(link.name)}</span>
      </a>
    `).join('');

    return `
      <div class="service-demo ${isEmbedded ? 'embedded' : ''}" style="--brand:${currentScene.color}">
        <nav class="demo-nav">
          <div class="brand-lockup">
            <div class="brand-mark">NC</div>
            <div class="brand-copy">
              <h1>${escapeHtml(currentScene.navTitle)}</h1>
              <p>${escapeHtml(currentScene.navSubtitle)}</p>
            </div>
          </div>
          <div class="nav-meta">
            <span class="meta-pill"><i data-lucide="message-square-text"></i>企业微信群</span>
            <span class="meta-pill"><i data-lucide="scan-line"></i>AI 实时抽取</span>
            <span class="meta-pill"><i data-lucide="workflow"></i>OA / 工单 / CRM</span>
          </div>
        </nav>

        <div class="scene-links">${links}</div>

        <main class="demo-main">
          <section class="chat-shell">
            <div class="panel-head">
              <div class="panel-title">
                <b>${escapeHtml(currentScene.title)}</b>
                <span>${escapeHtml(currentScene.subtitle)}</span>
              </div>
              <span class="live-badge"><span class="live-dot"></span>${escapeHtml(currentScene.statusText)}</span>
            </div>

            <div class="chat-window ${currentScene.monitor ? 'with-monitor' : ''}">
              ${currentScene.monitor ? '<div class="group-monitor" id="groupMonitor"></div>' : ''}
              <div class="wecom-top">
                <div class="group-title"><i data-lucide="users-round"></i><span>${escapeHtml(currentScene.group)}</span></div>
                <div class="group-count">${escapeHtml(currentScene.count)}</div>
              </div>
              <div class="messages" id="messages"></div>
              <div class="chat-input">
                <button class="icon-btn" type="button" title="语音"><i data-lucide="mic"></i></button>
                <div class="input-ghost">群聊输入框 · AI 在后台生成建议，仍由销售/售后确认发送</div>
                <button class="icon-btn" type="button" title="附件"><i data-lucide="paperclip"></i></button>
                <button class="icon-btn" type="button" title="更多"><i data-lucide="plus"></i></button>
              </div>
            </div>

            <div class="playbar">
              <button class="control-btn" type="button" id="resetBtn"><i data-lucide="rotate-ccw"></i>重播</button>
              <button class="control-btn" type="button" id="stepBtn"><i data-lucide="step-forward"></i>步进</button>
              <button class="control-btn primary" type="button" id="playBtn"><i data-lucide="pause"></i><span>暂停</span></button>
              <div class="progress">
                <div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>
                <span id="progressText">0 / 0</span>
              </div>
            </div>
          </section>

          <section class="ai-shell">
            <div class="panel-head">
              <div class="panel-title">
                <b>AI 机器人实时分析</b>
                <span>群消息识别后同步 OA / 工单 / CRM / 商城</span>
              </div>
              <span class="live-badge"><span class="live-dot"></span>Agent 分析中</span>
            </div>

            <div class="ai-content">
              <div class="ai-main">
                ${currentScene.contextNote ? `
                  <div class="ai-context-note">
                    <i data-lucide="bell-ring"></i>
                    <span>${escapeHtml(currentScene.contextNote)}</span>
                  </div>
                ` : ''}
                <div class="connector-flow" id="connectorFlow"></div>
                <div class="insight-grid">
                  ${insightDefs.map(renderInsightCard).join('')}
                </div>
              </div>

              <aside class="side-stack">
                <article class="side-card" style="--card-color:#F59E0B">
                  <div class="side-head">
                    <div class="side-title"><i data-lucide="clipboard-list"></i><span>任务预创建</span></div>
                    <span class="status-tag" id="taskStatus">草稿 0</span>
                  </div>
                  <div class="task-list" id="taskList"></div>
                </article>

                <article class="side-card" style="--card-color:#2563EB">
                  <div class="side-head">
                    <div class="side-title"><i data-lucide="message-square-reply"></i><span>确认后发送回复</span></div>
                    <span class="status-tag" id="replyStatus">待生成</span>
                  </div>
                  <div id="replyBox"></div>
                </article>

                <article class="side-card" style="--card-color:#8B5CF6">
                  <div class="side-head">
                    <div class="side-title"><i data-lucide="activity"></i><span>AI 执行记录</span></div>
                    <span class="status-tag detected">实时</span>
                  </div>
                  <div class="agent-log" id="agentLog"></div>
                </article>
              </aside>
            </div>

            <div class="footer-note">${escapeHtml(currentScene.footer)}</div>
          </section>
        </main>
      </div>
      <div class="service-toast" id="toast"></div>
    `;
  }

  function renderInsightCard(def) {
    return `
      <article class="insight-card ${def.id === 'profile' || def.id === 'next' ? 'span-2' : ''}" id="card-${def.id}" style="--card-color:${def.color}">
        <div class="insight-head">
          <div class="insight-icon"><i data-lucide="${def.icon}"></i></div>
          <div class="insight-title">
            <b>${escapeHtml(def.title)}</b>
            <span>${escapeHtml(def.sub)}</span>
          </div>
          <span class="status-tag" data-status>待识别</span>
        </div>
        <div class="field-list" data-body></div>
      </article>
    `;
  }

  function init() {
    bindEvents();
    reset();
    createIcons();
  }

  function bindEvents() {
    els.resetBtn.addEventListener('click', reset);
    els.stepBtn.addEventListener('click', () => {
      pause();
      step();
    });
    els.playBtn.addEventListener('click', () => {
      if (state.playing) pause();
      else play();
    });
  }

  function reset() {
    clearInterval(state.timer);
    state.messageIndex = 0;
    state.playing = true;
    state.data = {};
    state.tasks = [];
    state.logs = [];
    state.reply = null;
    state.sentReplyKey = '';
    state.connectors = new Set();
    state.monitorActive = scene.monitor?.active || '';
    state.activeRole = '';
    els.messages.innerHTML = '';
    els.agentLog.innerHTML = '<div class="empty-copy">等待第一条群聊消息...</div>';
    renderMonitor();
    renderConnectorFlow();
    renderAllCards();
    renderTasks();
    renderReply();
    updateProgress();
    updatePlayButton();
    step();
    schedule();
    createIcons();
  }

  function schedule() {
    clearInterval(state.timer);
    if (!state.playing) return;
    state.timer = setInterval(() => {
      const hasMore = step();
      if (!hasMore) pause();
    }, 1850);
  }

  function play() {
    state.playing = true;
    updatePlayButton();
    schedule();
  }

  function pause() {
    state.playing = false;
    clearInterval(state.timer);
    updatePlayButton();
  }

  function updatePlayButton() {
    els.playBtn.innerHTML = `<i data-lucide="${state.playing ? 'pause' : 'play'}"></i><span>${state.playing ? '暂停' : '播放'}</span>`;
    createIcons();
  }

  function step() {
    if (state.messageIndex >= scene.messages.length) return false;
    const msg = scene.messages[state.messageIndex];
    if (msg.monitorActive) state.monitorActive = msg.monitorActive;
    const row = addMessage(msg);
    applyUpdates(msg);
    state.messageIndex += 1;
    renderMonitor();
    updateProgress();
    triggerExtraction(row, msg);
    return state.messageIndex < scene.messages.length;
  }

  function addMessage(msg) {
    const meta = roleMeta[msg.role] || roleMeta.customer;
    const row = document.createElement('div');
    row.className = 'message-row' + (meta.own ? ' own' : '');
    const avatar = `<div class="avatar">${meta.img ? `<img src="${escapeHtml(meta.img)}" alt="${escapeHtml(meta.avatar)}">` : escapeHtml(meta.avatar)}</div>`;
    const bubble = `
      <div class="bubble-wrap">
        <div class="sender-line"><span>${escapeHtml(msg.name)}</span><time>${escapeHtml(msg.time)}</time></div>
        ${renderMessageContent(msg)}
      </div>
    `;
    row.innerHTML = meta.own ? bubble + avatar : avatar + bubble;
    els.messages.appendChild(row);
    els.messages.scrollTop = els.messages.scrollHeight;
    return row;
  }

  function renderMessageContent(msg) {
    if (msg.kind === 'logistics') {
      return `
        <div class="bubble">${escapeHtml(msg.text)}</div>
        <div class="rich-card logistics-card">
          <div class="rich-head"><i data-lucide="truck"></i><span>${escapeHtml(msg.logistics.title)}</span></div>
          <div class="rich-body">
            <div class="route-line">
              <div class="route-node"><span>1</span><span>已发货</span></div>
              <div class="route-node"><span>2</span><span>运输中</span></div>
              <div class="route-node"><span>3</span><span>预计到店</span></div>
            </div>
            ${rowsHtml(msg.logistics.rows)}
          </div>
        </div>
      `;
    }

    if (msg.kind === 'spec') {
      return `
        <div class="bubble">${escapeHtml(msg.text)}</div>
        <div class="rich-card">
          <div class="rich-head"><i data-lucide="ruler"></i><span>${escapeHtml(msg.spec.title)}</span></div>
          <div class="rich-body spec-grid">${rowsHtml(msg.spec.rows)}</div>
        </div>
      `;
    }

    if (msg.kind === 'training') {
      return `
        <div class="bubble">${escapeHtml(msg.text)}</div>
        <div class="rich-card">
          <div class="rich-head"><i data-lucide="graduation-cap"></i><span>${escapeHtml(msg.training.title)}</span></div>
          <div class="rich-body">${rowsHtml(msg.training.rows)}</div>
        </div>
      `;
    }

    if (msg.kind === 'photos') {
      return `
        <div class="bubble">${escapeHtml(msg.text)}</div>
        <div class="photo-strip">
          <div class="photo-grid">
            <div class="photo-tile" style="--tile-a:#DBEAFE;--tile-b:#D1FAE5"><i data-lucide="chef-hat"></i></div>
            <div class="photo-tile" style="--tile-a:#FEF3C7;--tile-b:#FEE2E2"><i data-lucide="cooking-pot"></i></div>
            <div class="photo-tile" style="--tile-a:#E0F2FE;--tile-b:#FDE68A"><i data-lucide="utensils"></i></div>
          </div>
          <div class="photo-caption">${escapeHtml(msg.photos.caption)}</div>
        </div>
      `;
    }

    if (msg.kind === 'mall') {
      return `
        <div class="bubble">${escapeHtml(msg.text)}</div>
        <div class="rich-card mall-card">
          <div class="rich-head"><i data-lucide="shopping-bag"></i><span>星环配件商城</span></div>
          <div class="rich-body">
            <div class="mall-preview">
              <div class="part-visual"><i data-lucide="${escapeHtml(msg.mall.icon || 'package')}"></i></div>
              <div class="mall-info">
                <div class="mall-title">${escapeHtml(msg.mall.title)}</div>
                <div class="mall-copy">${escapeHtml(msg.mall.copy)}</div>
                <button class="small-btn primary" type="button"><i data-lucide="external-link"></i>查看配件</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (msg.kind === 'salesCard') {
      return `
        <div class="bubble">${escapeHtml(msg.text)}</div>
        <div class="rich-card">
          <div class="rich-head"><i data-lucide="${escapeHtml(msg.card?.icon || 'file-text')}"></i><span>${escapeHtml(msg.card?.title || '销售资料卡')}</span></div>
          <div class="rich-body spec-grid">${rowsHtml(msg.card?.rows || [])}</div>
        </div>
      `;
    }

    return `<div class="bubble">${escapeHtml(msg.text)}</div>`;
  }

  function rowsHtml(rows) {
    return (rows || []).map(([label, value]) => `
      <div class="rich-row"><label>${escapeHtml(label)}</label><span>${escapeHtml(value)}</span></div>
    `).join('');
  }

  function applyUpdates(msg) {
    const updates = msg.updates || {};
    insightDefs.forEach(def => {
      if (updates[def.id]) {
        state.data[def.id] = mergeValue(state.data[def.id], updates[def.id]);
        pulseCard(def.id);
      }
    });

    if (updates.tasks) {
      updates.tasks.forEach(task => {
        const existing = state.tasks.find(item => item.type === task.type && item.name === task.name);
        if (existing) Object.assign(existing, task);
        else state.tasks.push({ ...task });
      });
    }

    if (updates.connectors) updates.connectors.forEach(item => state.connectors.add(item));
    if (updates.reply) state.reply = updates.reply;

    if (msg.log) {
      msg.log.forEach((line, idx) => {
        state.logs.push({
          title: idx === 0 ? 'Observe' : idx === 1 ? 'Reason' : 'Execute',
          copy: line
        });
      });
    }

    renderConnectorFlow();
    renderAllCards();
    renderTasks();
    renderReply();
    renderLogs();
    createIcons();
  }

  function mergeValue(oldValue, newValue) {
    if (!oldValue) return { ...newValue };
    return {
      ...oldValue,
      ...newValue,
      fields: newValue.fields || oldValue.fields,
      tags: newValue.tags || oldValue.tags
    };
  }

  function renderMonitor() {
    if (!scene.monitor || !els.monitor) return;
    const remain = Math.max(3, scene.monitor.countdown - state.messageIndex * 2);
    els.monitor.innerHTML = `
      <div class="monitor-head">
        <div class="monitor-title"><i data-lucide="radar"></i><span>AI 售后群雷达 · 从大量未读群中浮现问题</span></div>
        <div class="monitor-stats">
          <span>${scene.monitor.total} 个群</span>
          <span>${scene.monitor.unread} 条未读</span>
          <span>${escapeHtml(scene.monitor.surfaced)}</span>
          <span class="countdown">00:${String(remain).padStart(2, '0')}</span>
        </div>
      </div>
      <div class="monitor-list">
        ${scene.monitor.groups.map(group => `
          <div class="group-chip ${group.id === state.monitorActive ? 'active' : ''} ${group.urgent ? 'urgent' : ''}">
            <div class="group-chip-title">${escapeHtml(group.title)}</div>
            <div class="group-chip-copy">${escapeHtml(group.copy)}</div>
            <div class="group-chip-meta">
              <span class="unread-dot">${escapeHtml(group.unread)}</span>
              <span class="ai-tag">${escapeHtml(group.tag)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    createIcons();
  }

  function renderConnectorFlow() {
    const keys = ['oa', 'ticket', 'crm', 'mall'];
    els.connectorFlow.innerHTML = keys.map(key => {
      const item = connectorLabels[key];
      const active = state.connectors.has(key);
      return `
        <div class="connector-step ${active ? 'active' : ''}">
          <i data-lucide="${item.icon}"></i>
          <div><b>${item.title}</b><span>${active ? '已对接' : item.copy}</span></div>
        </div>
      `;
    }).join('');
  }

  function renderAllCards() {
    insightDefs.forEach(def => {
      if (def.id === 'profile') renderProfileCard();
      else renderInsightCardBody(def.id);
    });
  }

  function renderProfileCard() {
    const card = document.getElementById('card-profile');
    const raw = state.data.profile;
    const status = card.querySelector('[data-status]');
    const body = card.querySelector('[data-body]');
    if (!raw) {
      status.textContent = '待识别';
      status.className = 'status-tag';
      body.innerHTML = `<div class="empty-copy">${escapeHtml(emptyText.profile)}</div>`;
      return;
    }

    const preset = profilePresets[sceneId] || profilePresets.delivery;
    const data = {
      ...preset,
      ...raw,
      person: { ...preset.person, ...(raw.person || {}) },
      roles: raw.roles || preset.roles,
      business: raw.business || preset.business
    };
    const roles = data.roles || [];
    if (!state.activeRole && roles.length) state.activeRole = roles[0].key;
    const activeRole = roles.find(role => role.key === state.activeRole) || roles[0] || {};

    status.textContent = data.status || '已识别';
    status.className = /风险|争议/.test(data.status || '') ? 'status-tag risk' : 'status-tag detected';
    const tags = (data.tags || []).map((tag, idx) => {
      const palette = ['blue', 'green', 'orange', 'purple', 'rose', 'cyan'][idx % 6];
      return `<span class="chip ${palette}">${escapeHtml(tag)}</span>`;
    }).join('');
    const fields = (data.fields || []).slice(0, 3).map(([label, value]) => `
      <div class="field-row"><label>${escapeHtml(label)}</label><b>${escapeHtml(value)}</b></div>
    `).join('');
    const business = (data.business || []).map(([label, value]) => `
      <div class="business-tile"><label>${escapeHtml(label)}</label><b>${escapeHtml(value)}</b></div>
    `).join('');
    const roleTraits = (activeRole.traits || []).map((trait, idx) => {
      const palette = ['blue', 'green', 'orange'][idx % 3];
      return `<span class="chip ${palette}">${escapeHtml(trait)}</span>`;
    }).join('');

    body.innerHTML = `
      <div class="profile-rich">
        <div class="profile-person">
          <div class="profile-photo"><img src="${escapeHtml(data.person.avatar)}" alt="${escapeHtml(data.person.name)}"></div>
          <div class="profile-name">
            <b>${escapeHtml(data.person.name)}</b>
            <span>${escapeHtml(data.person.title)}</span>
          </div>
          <div class="profile-wechat">${escapeHtml(data.person.wechat)}</div>
          <div class="role-tabs">
            ${roles.map(role => `<button class="role-tab ${role.key === state.activeRole ? 'active' : ''}" type="button" data-role-key="${escapeHtml(role.key)}">${escapeHtml(role.label)}</button>`).join('')}
          </div>
        </div>
        <div class="profile-detail">
          <div class="role-detail">
            <div class="role-detail-title">
              <b>${escapeHtml(activeRole.label || '角色')} · ${escapeHtml(activeRole.name || '')}</b>
              <span>${escapeHtml(activeRole.focus || '')}</span>
            </div>
            <div class="chips">${roleTraits}</div>
          </div>
          <div class="profile-section business-section">
            <div class="profile-section-title">客户经营信息</div>
            <div class="business-grid">${business}</div>
          </div>
          <div class="profile-section ai-section">
            <div class="profile-section-title">AI 实时抽取</div>
            ${fields}
            ${tags ? `<div class="chips">${tags}</div>` : ''}
          </div>
        </div>
      </div>
    `;
    body.querySelectorAll('[data-role-key]').forEach(button => {
      button.addEventListener('click', event => {
        state.activeRole = event.currentTarget.dataset.roleKey;
        renderProfileCard();
        createIcons();
      });
    });
  }

  function renderInsightCardBody(key) {
    const card = document.getElementById('card-' + key);
    const data = state.data[key];
    const status = card.querySelector('[data-status]');
    const body = card.querySelector('[data-body]');
    if (!data) {
      status.textContent = '待识别';
      status.className = 'status-tag';
      body.innerHTML = `<div class="empty-copy">${escapeHtml(emptyText[key])}</div>`;
      return;
    }

    status.textContent = data.status || '已识别';
    status.className = key === 'quality' && /风险|重复/.test(data.status || '') ? 'status-tag risk' : 'status-tag detected';
    const fields = (data.fields || []).map(([label, value]) => `
      <div class="field-row"><label>${escapeHtml(label)}</label><b>${escapeHtml(value)}</b></div>
    `).join('');
    const tags = (data.tags || []).map((tag, idx) => {
      const palette = ['blue', 'green', 'orange', 'purple', 'rose', 'cyan'][idx % 6];
      return `<span class="chip ${palette}">${escapeHtml(tag)}</span>`;
    }).join('');
    body.innerHTML = fields + (tags ? `<div class="chips">${tags}</div>` : '');
  }

  function renderTasks() {
    els.taskStatus.textContent = '草稿 ' + state.tasks.length;
    els.taskStatus.className = state.tasks.length ? 'status-tag draft' : 'status-tag';
    if (!state.tasks.length) {
      els.taskList.innerHTML = '<div class="empty-copy">AI 会把群消息预创建为 OA、工单、CRM 或商城任务，等待人工确认。</div>';
      return;
    }
    els.taskList.innerHTML = state.tasks.map((task, idx) => `
      <div class="task-item">
        <div class="task-top">
          <div class="task-name"><i data-lucide="${taskIcon(task.type)}"></i><span>${escapeHtml(task.name)}</span></div>
          <span class="status-tag draft">${escapeHtml(task.status || '待确认')}</span>
        </div>
        <div class="task-desc">${escapeHtml(task.desc)}</div>
        <div class="task-meta">
          <span class="mini-tag">${escapeHtml(task.type)}</span>
          <span class="mini-tag">负责人：${escapeHtml(task.owner)}</span>
        </div>
        <button class="small-btn primary" type="button" data-task-confirm="${idx}"><i data-lucide="check"></i>确认创建</button>
      </div>
    `).join('');
    els.taskList.querySelectorAll('[data-task-confirm]').forEach(btn => {
      btn.addEventListener('click', event => {
        const index = Number(event.currentTarget.dataset.taskConfirm);
        state.tasks[index].status = '已创建';
        showToast(state.tasks[index].type + ' 已创建：' + state.tasks[index].name);
        renderTasks();
        createIcons();
      });
    });
  }

  function taskIcon(type) {
    if (type === '工单') return 'wrench';
    if (type === 'CRM') return 'badge-dollar-sign';
    if (type === '商城') return 'shopping-bag';
    return 'clipboard-check';
  }

  function renderReply() {
    if (!state.reply) {
      els.replyStatus.textContent = '待生成';
      els.replyStatus.className = 'status-tag';
      els.replyBox.innerHTML = '<div class="empty-copy">字段足够完整后，AI 生成一条由销售或售后确认后发送的回复建议。</div>';
      return;
    }
    const sent = state.sentReplyKey === state.reply.text;
    els.replyStatus.textContent = sent ? '已发送' : '待确认';
    els.replyStatus.className = sent ? 'status-tag detected' : 'status-tag draft';
    els.replyBox.innerHTML = `
      <div class="reply-box">
        <div class="reply-text">${escapeHtml(state.reply.text)}</div>
        <div class="reply-actions">
          <span class="mini-tag">发送身份：${escapeHtml(state.reply.by)}</span>
          <button class="small-btn primary" type="button" id="sendReplyBtn"><i data-lucide="send"></i>${sent ? '再次演示发送' : '确认发送'}</button>
        </div>
      </div>
    `;
    document.getElementById('sendReplyBtn').addEventListener('click', () => addAiReply(state.reply));
  }

  function addAiReply(reply) {
    const role = reply.by.includes('销售') ? 'sales' : reply.by.includes('交付') ? 'delivery' : 'service';
    addMessage({ role, name: reply.by, time: currentTime(), text: reply.text });
    state.sentReplyKey = reply.text;
    showToast('已模拟由' + reply.by + '确认并发送');
    renderReply();
    createIcons();
  }

  function renderLogs() {
    if (!state.logs.length) {
      els.agentLog.innerHTML = '<div class="empty-copy">等待第一条群聊消息...</div>';
      return;
    }
    els.agentLog.innerHTML = state.logs.slice(-12).map(log => `
      <div class="log-item">
        <div class="log-title">${escapeHtml(log.title)}</div>
        <div class="log-copy">${escapeHtml(log.copy)}</div>
      </div>
    `).join('');
    els.agentLog.scrollTop = els.agentLog.scrollHeight;
  }

  function updateProgress() {
    const total = scene.messages.length;
    const current = Math.min(state.messageIndex, total);
    els.progressText.textContent = current + ' / ' + total;
    els.progressFill.style.width = total ? (current / total * 100) + '%' : '0%';
  }

  function pulseCard(key) {
    const card = document.getElementById('card-' + key);
    if (!card) return;
    card.classList.remove('updated');
    void card.offsetWidth;
    card.classList.add('updated');
    setTimeout(() => card.classList.remove('updated'), 650);
  }

  function triggerExtraction(row, msg) {
    const key = msg.extract || getExtractionKey(msg);
    if (!key || !row) return;
    const source = row.querySelector('.bubble, .rich-card, .photo-strip');
    const target = document.getElementById('card-' + key);
    if (!source || !target) return;
    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const startX = sourceRect.right + 8;
    const startY = sourceRect.top + sourceRect.height / 2;
    const endX = targetRect.left + 16;
    const width = endX - startX;
    if (width < 48) return;

    const beam = document.createElement('div');
    beam.className = 'extraction-beam';
    beam.style.setProperty('--beam-left', startX + 'px');
    beam.style.setProperty('--beam-top', startY + 'px');
    beam.style.setProperty('--beam-width', width + 'px');

    const chip = document.createElement('div');
    chip.className = 'extraction-chip';
    chip.textContent = extractionLabel(key);
    chip.style.setProperty('--chip-left', startX + 12 + 'px');
    chip.style.setProperty('--chip-top', startY - 18 + 'px');
    chip.style.setProperty('--chip-move', Math.max(34, width - 120) + 'px');

    document.body.appendChild(beam);
    document.body.appendChild(chip);
    setTimeout(() => {
      beam.remove();
      chip.remove();
    }, 980);
  }

  function getExtractionKey(msg) {
    const updates = msg.updates || {};
    const order = ['ticket', 'workflow', 'product', 'quality', 'profile', 'next'];
    return order.find(key => updates[key]) || '';
  }

  function extractionLabel(key) {
    const labels = {
      profile: '抽取用户画像',
      workflow: '同步 OA 流程',
      ticket: '预填工单',
      product: '识别产品建议',
      quality: '沉淀质量分析',
      next: '生成下一步建议'
    };
    return labels[key] || 'AI 抽取';
  }

  function showToast(text) {
    els.toast.textContent = text;
    els.toast.classList.add('is-visible');
    setTimeout(() => els.toast.classList.remove('is-visible'), 1700);
  }

  function currentTime() {
    const now = new Date();
    return String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  }

  function createIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  function escapeHtml(value) {
    return String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  init();
})();
