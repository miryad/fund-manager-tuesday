import { memo } from 'react';
import { gameConfig } from '../game/config';
import { RESOURCE_IDS } from '../game/types';
import type { ResourceValues } from '../game/types';

interface ResourcePanelProps {
  readonly resources: ResourceValues;
  readonly changedResources?: ReadonlySet<string>;
}

const NO_CHANGED_RESOURCES: ReadonlySet<string> = new Set();

export const ResourcePanel = memo(function ResourcePanel({
  resources,
  changedResources = NO_CHANGED_RESOURCES,
}: ResourcePanelProps) {
  return (
    <aside className="resource-panel" aria-label="Fund resources">
      <p className="panel-label">Resource monitor</p>
      <div className="resource-grid">
        {RESOURCE_IDS.map((resource) => {
          const rule = gameConfig.resources[resource];
          const value = resources[resource];
          const percentage = ((value - rule.minimum) / (rule.maximum - rule.minimum)) * 100;

          return (
            <div
              className="resource"
              data-changed={changedResources.has(resource) || undefined}
              key={resource}
            >
              <div className="resource__heading">
                <span>{rule.label}</span>
                <strong>{value}</strong>
              </div>
              <div
                className="resource__track"
                role="meter"
                aria-label={rule.label}
                aria-valuemin={rule.minimum}
                aria-valuemax={rule.maximum}
                aria-valuenow={value}
              >
                <span
                  className="resource__fill"
                  style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
});
