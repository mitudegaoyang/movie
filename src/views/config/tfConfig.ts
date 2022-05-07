import { ref } from "vue";
const searchInput = ref();

type TableDataType = {
  id: number;
  title: string;
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
    fixed: "left",
    width: 100,
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    fixed: "left",
    width: 400,
    customFilterDropdown: true,
    onFilter: (value: string, record: TableDataType): boolean => {
      return record.title
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
    title: "IMDb",
    dataIndex: "imdb",
    key: "imdb",
    width: 100,
    customFilterDropdown: true,
    onFilter: (value: string, record: TableDataType): boolean =>
      record.imdb.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean): void => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
    sorter: {
      compare: (a: TableDataType, b: TableDataType): number => a.imdb - b.imdb,
      multiple: 3,
    },
  },
  {
    title: "IMDb人数",
    dataIndex: "imdb_user",
    key: "imdb_user",
    width: 130,
    customFilterDropdown: true,
    onFilter: (value: string, record: TableDataType): boolean =>
      record.imdb_user.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean): void => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
    sorter: {
      compare: (a: TableDataType, b: TableDataType): number =>
        a.imdb_user - b.imdb_user,
      multiple: 3,
    },
  },
  {
    title: "豆瓣",
    dataIndex: "douban",
    key: "douban",
    width: 100,
    customFilterDropdown: true,
    onFilter: (value: string, record: TableDataType): boolean =>
      record.douban.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean): void => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
    sorter: {
      compare: (a: TableDataType, b: TableDataType): number =>
        a.douban - b.douban,
      multiple: 3,
    },
  },
  {
    title: "豆瓣人数",
    dataIndex: "douban_user",
    key: "douban_user",
    width: 120,
    customFilterDropdown: true,
    onFilter: (value: string, record: TableDataType): boolean =>
      record.douban_user.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean): void => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
    sorter: {
      compare: (a: TableDataType, b: TableDataType): number =>
        a.douban_user - b.douban_user,
      multiple: 3,
    },
  },
  {
    title: "片长",
    dataIndex: "time",
    key: "time",
    width: 100,
    customFilterDropdown: true,
    onFilter: (value: string, record: TableDataType): boolean =>
      record.time.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean): void => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
    sorter: {
      compare: (a: TableDataType, b: TableDataType): number => a.time - b.time,
      multiple: 3,
    },
  },
  {
    title: "类型",
    dataIndex: "category",
    key: "category",
    width: 200,
    customFilterDropdown: true,
    onFilter: (value: string, record: TableDataType): boolean =>
      record.category.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean): void => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "年份",
    dataIndex: "year",
    key: "year",
    width: 100,
    customFilterDropdown: true,
    onFilter: (value: string, record: TableDataType): boolean =>
      record.year.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean): void => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
    sorter: {
      compare: (a: TableDataType, b: TableDataType): number => a.year - b.year,
      multiple: 3,
    },
  },
  {
    title: "产地",
    dataIndex: "areas",
    key: "areas",
    width: 200,
    customFilterDropdown: true,
    onFilter: (value: string, record: TableDataType): boolean =>
      record.areas.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean): void => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "语言",
    dataIndex: "language",
    key: "language",
    width: 150,
    customFilterDropdown: true,
    onFilter: (value: string, record: TableDataType): boolean =>
      record.language.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean): void => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: 180,
    // defaultSortOrder: "descend",
    sorter: {
      compare: (a: TableDataType, b: TableDataType): number => a.id - b.id,
      multiple: 3,
    },
  },
  {
    title: "操作",
    key: "action",
    fixed: "right",
    width: 120,
  },
];

export { searchInput, TFDATA };
