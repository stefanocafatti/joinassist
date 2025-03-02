
import React from "react";
import TaskCategories from "../home/TaskCategories";

interface CategoriesSectionProps {
  showAllTasks?: boolean;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ showAllTasks = false }) => {
  return <TaskCategories showAllTasks={showAllTasks} />;
};

export default CategoriesSection;
