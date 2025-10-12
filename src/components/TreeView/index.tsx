import React, { useState } from 'react';
import styles from './styles.module.scss';

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeViewProps {
  data: TreeNode[];
  defaultExpandedIds?: string[];
  onNodeClick?: (node: TreeNode) => void;
  className?: string;
}

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onNodeClick?: (node: TreeNode) => void;
}

function TreeNodeItem({ node, level, expandedIds, onToggle, onNodeClick }: TreeNodeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);

  const handleClick = () => {
    if (node.disabled) return;
    if (hasChildren) {
      onToggle(node.id);
    }
    onNodeClick?.(node);
  };

  return (
    <div className={styles.treeNodeWrapper}>
      <div
        className={`${styles.treeNode} ${node.disabled ? styles.disabled : ''}`}
        style={{ paddingLeft: `${level * 1.5}rem` }}
        onClick={handleClick}
      >
        {hasChildren && (
          <span className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>
            ▶
          </span>
        )}
        {!hasChildren && <span className={styles.spacer}></span>}
        {node.icon && <span className={styles.icon}>{node.icon}</span>}
        <span className={styles.label}>{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div className={styles.children}>
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              expandedIds={expandedIds}
              onToggle={onToggle}
              onNodeClick={onNodeClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeView({
  data,
  defaultExpandedIds = [],
  onNodeClick,
  className = ''
}: TreeViewProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(defaultExpandedIds));

  const handleToggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`${styles.treeView} ${className}`}>
      {data.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          level={0}
          expandedIds={expandedIds}
          onToggle={handleToggle}
          onNodeClick={onNodeClick}
        />
      ))}
    </div>
  );
}
