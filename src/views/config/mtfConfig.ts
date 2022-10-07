import { ref } from "vue";
const searchInput = ref();

type TableDataType = {
  id: number;
  title: string;
  mTitle: string;
  url: string;
  date: string;
  desc: string;
  img: string;
  link: string;
  summary: string;
  imdb: number;
  imdb_user: number;
  douban: number;
  douban_user: number;
  category: string;
  translation: string;
  name: string;
  year: number;
  areas: string;
  language: string;
  caption: string;
  release: string;
  time: number;
  director: string;
  writers: string;
  actor: string;
  tag: string;
  introduction: string;
};

const TFDATA = [
  {
    title: "海报",
    dataIndex: "img",
    key: "img",
    width: 100,
  },
  {
    title: "标题",
    dataIndex: "mTitle",
    key: "mTitle",
    customFilterDropdown: true,
    onFilter: (value: string, record: TableDataType): boolean => {
      return record.mTitle
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
    onFilterDropdownVisibleChange: (visible: boolean): void => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "操作",
    key: "action",
    width: 120,
  },
];

export { searchInput, TFDATA };
