import React, { useState } from 'react';
import { Card, Divider, Typography, Button } from '@douyinfe/semi-ui';
import PropTypes from 'prop-types';
import { useIsMobile } from '../../../hooks/common/useIsMobile';
import { IconEyeOpened, IconEyeClosed } from '@douyinfe/semi-icons';

const { Text } = Typography;

/**
 * CardPro 高级卡片组件
 *
 * 布局分为6个区域：
 * 1. 统计信息区域 (statsArea)
 * 2. 描述信息区域 (descriptionArea)
 * 3. 类型切换/标签区域 (tabsArea)
 * 4. 操作按钮区域 (actionsArea)
 * 5. 搜索表单区域 (searchArea)
 * 6. 分页区域 (paginationArea) - 固定在卡片底部
 *
 * 支持三种布局类型：
 * - type1: 操作型 (如TokensTable) - 描述信息 + 操作按钮 + 搜索表单
 * - type2: 查询型 (如LogsTable) - 统计信息 + 搜索表单
 * - type3: 复杂型 (如ChannelsTable) - 描述信息 + 类型切换 + 操作按钮 + 搜索表单
 */
const CardPro = ({
  type = 'type1',
  className = '',
  children,
  // 各个区域的内容
  statsArea,
  descriptionArea,
  tabsArea,
  actionsArea,
  searchArea,
  paginationArea, // 新增分页区域
  // 卡片属性
  shadows = '',
  bordered = true,
  // 自定义样式
  style,
  // 国际化函数
  t = (key) => key,
  ...props
}) => {
  const isMobile = useIsMobile();
  const [showMobileActions, setShowMobileActions] = useState(false);

  const toggleMobileActions = () => {
    setShowMobileActions(!showMobileActions);
  };

  const hasMobileHideableContent = actionsArea || searchArea;

  const renderHeader = () => {
    const hasContent =
      statsArea || descriptionArea || tabsArea || actionsArea || searchArea;
    if (!hasContent) return null;

    return (
      <div className='flex flex-col w-full'>
        {/* 统计信息区域 - 用于type2 */}
        {type === 'type2' && statsArea && <>{statsArea}</>}

        {/* 描述信息区域 - 用于type1和type3 */}
        {(type === 'type1' || type === 'type3') && descriptionArea && (
          <>{descriptionArea}</>
        )}

        {/* 第一个分隔线 - 在描述信息或统计信息后面 */}
        {((type === 'type1' || type === 'type3') && descriptionArea) ||
        (type === 'type2' && statsArea) ? (
          <Divider margin='12px' />
        ) : null}

        {/* 类型切换/标签区域 - 主要用于type3 */}
        {type === 'type3' && tabsArea && <>{tabsArea}</>}

        {/* 移动端操作切换按钮 */}
        {isMobile && hasMobileHideableContent && (
          <>
            <div className='w-full mb-2'>
              <Button
                onClick={toggleMobileActions}
                icon={showMobileActions ? <IconEyeClosed /> : <IconEyeOpened />}
                type='tertiary'
                size='small'
                theme='outline'
                block
              >
                {showMobileActions ? t('隐藏操作项') : t('显示操作项')}
              </Button>
            </div>
          </>
        )}

        {/* 操作按钮和搜索表单的容器 */}
        <div
          className={`flex flex-col gap-2 ${isMobile && !showMobileActions ? 'hidden' : ''}`}
        >
          {/* 操作按钮区域 - 用于type1和type3 */}
          {(type === 'type1' || type === 'type3') &&
            actionsArea &&
            (Array.isArray(actionsArea) ? (
              actionsArea.map((area, idx) => (
                <React.Fragment key={idx}>
                  {idx !== 0 && <Divider />}
                  <div className='w-full'>{area}</div>
                </React.Fragment>
              ))
            ) : (
              <div className='w-full'>{actionsArea}</div>
            ))}

          {/* 当同时存在操作区和搜索区时，插入分隔线 */}
          {actionsArea && searchArea && <Divider />}

          {/* 搜索表单区域 - 所有类型都可能有 */}
          {searchArea && <div className='w-full'>{searchArea}</div>}
        </div>
      </div>
    );
  };

  const headerContent = renderHeader();

  // 渲染分页区域
  const renderFooter = () => {
    if (!paginationArea) return null;

    return (
      <div
        className={`flex w-full pt-4 border-t ${isMobile ? 'justify-center' : 'justify-between items-center'}`}
        style={{ borderColor: 'var(--semi-color-border)' }}
      >
        {paginationArea}
      </div>
    );
  };

  const footerContent = renderFooter();

  return (
    <Card
      className={`table-scroll-card !rounded-2xl ${className}`}
      title={headerContent}
      footer={footerContent}
      shadows={shadows}
      bordered={bordered}
      style={style}
      {...props}
    >
      {children}
    </Card>
  );
};

CardPro.propTypes = {
  // 布局类型
  type: PropTypes.oneOf(['type1', 'type2', 'type3']),
  // 样式相关
  className: PropTypes.string,
  style: PropTypes.object,
  shadows: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  bordered: PropTypes.bool,
  // 内容区域
  statsArea: PropTypes.node,
  descriptionArea: PropTypes.node,
  tabsArea: PropTypes.node,
  actionsArea: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  searchArea: PropTypes.node,
  paginationArea: PropTypes.node,
  // 表格内容
  children: PropTypes.node,
  // 国际化函数
  t: PropTypes.func,
};

export default CardPro;

