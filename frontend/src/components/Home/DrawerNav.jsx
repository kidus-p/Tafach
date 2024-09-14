import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export function TransparentTabs(tabs) {
  const data = ["My Recipes", "Liked", "Saved"];
  return (
    <Tabs value="html" className="max-w-[40rem]">
      <TabsHeader
        className="bg-transparent"
        indicatorProps={{
          className: "bg-gray-900/10 shadow-none !text-gray-900",
        }}
      >
        {data.map((value) => (
          <Tab key={value} value={value}>
            {value}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}
