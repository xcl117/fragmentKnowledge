// var list = [
//   { nodeId: "1", name: "food", lft: "1", rgt: "18" },
//   { nodeId: "2", name: "fruit", lft: "2", rgt: "11" },
//   { nodeId: "3", name: "red", lft: "3", rgt: "6" },
//   { nodeId: "4", name: "cherry", lft: "4", rgt: "5" },
//   { nodeId: "5", name: "yellow", lft: "7", rgt: "10" },
//   { nodeId: "6", name: "banana", lft: "8", rgt: "9" },
//   { nodeId: "7", name: "meat", lft: "12", rgt: "17" },
//   { nodeId: "8", name: "beef", lft: "13", rgt: "14" },
//   { nodeId: "9", name: "pork", lft: "15", rgt: "16" }
// ];
var list = [
  { nodeId: "1", name: "food", lft: "1", rgt: "26" },
  { nodeId: "2", name: "fruit", lft: "2", rgt: "11" },
  { nodeId: "3", name: "red", lft: "3", rgt: "6" },
  { nodeId: "4", name: "cherry", lft: "4", rgt: "5" },
  { nodeId: "5", name: "yellow", lft: "7", rgt: "10" },
  { nodeId: "6", name: "banana", lft: "8", rgt: "9" },
  { nodeId: "7", name: "meat", lft: "12", rgt: "17" },
  { nodeId: "8", name: "beef", lft: "13", rgt: "14" },
  { nodeId: "9", name: "pork", lft: "15", rgt: "16" },
  { nodeId: "10", name: "Milk", lft: "18", rgt: "21" },
  { nodeId: "11", name: "MilkSuan", lft: "19", rgt: "20" },
  { nodeId: "12", name: "rice", lft: "22", rgt: "25" },
  { nodeId: "13", name: "MilkSuan", lft: "23", rgt: "24" }
];

// 不采用layer, 而采用lft和rgt的关系
// 因为js中字符串比较的时候，是按照字符串的方式比较的
// 此处需要先将所有lft和rgt转换为数值类型，
list.forEach(a => {
  a.lft = Number(a.lft);
  a.rgt = Number(a.rgt);
});
// 对list进行排序，按lft大小排
list.sort((a, b) => a.lft - b.lft);
// 获取node的孩子节点
function findChilds(node) {
  // 所有的子孙后代节点
  let childrens = list.filter(ele => node.lft < ele.lft && ele.rgt < node.rgt);
  if (!childrens.length) {
    return;
  }
  let firstChild = childrens[0];
  // 标记当前节点已经使用过
  firstChild.isUsed = true;

  node.childs = [firstChild];
  // 注：此处一定要先获取兄弟节点，再递归子节点
  // 先获取下一个兄弟节点
  findNextSiblings(node, firstChild);
  // 再对子节点递归
  findChilds(firstChild);

  return node;
}
// 获取child的下一个同层兄弟节点
function findNextSiblings(parent, child) {
  let node = list.find(ele => ele.lft > child.rgt && !ele.isUsed);
  if (node) {
    node.isUsed = true;

    parent.childs.push(node);
    findNextSiblings(parent, node);
    findChilds(node); // 获取下一个孩子的子节点
  }
}

var tree = findChilds(list[0]);
console.log(tree);
