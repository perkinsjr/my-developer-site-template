import { defineSchema } from "@tinacms/cli";
import type { TinaTemplate } from "@tinacms/cli";

const heroBlock: TinaTemplate = {
  name: "hero",
  label: "Hero Block",
  fields: [
    {
      type: "string",
      label: "Heading",
      name: "heading",
    },
    {
      type: "string",
      label: "Sub Heading",
      name: "subheading",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "image",
      name: "image",
      label: "Hero Image",
    },
  ],
};

const projectSection: TinaTemplate = {
  name: "projects",
  label: "Projects Section",
  fields: [
    {
      type: "string",
      label: "Heading",
      name: "heading",
    },
    {
      type: "string",
      label: "Sub Heading",
      name: "subheading",
    },
    {
      type: "object",
      label: "Project Items",
      name: "items",
      list: true,
      fields: [
        {
          name: "image",
          label: "Project Image",
          type: "image",
        },
        {
          name: "name",
          label: "Content name",
          type: "string",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
          ui: {
            component: "textarea",
          },
        },
        {
          name: "href",
          label: "Link URL",
          type: "string",
        },
      ],
    },
  ],
};

const featureSection: TinaTemplate = {
  name: "features",
  label: "Featured Articles",
  fields: [
    {
      type: "object",
      label: "Featured Items",
      name: "items",
      list: true,
      fields: [
        {
          name: "image",
          label: "Featured Image",
          type: "image",
        },
        {
          name: "title",
          label: "Featured Title",
          type: "string",
        },
        {
          name: "author",
          label: "Featured Author",
          type: "string",
        },
        {
          name: "category",
          label: "Featured Category",
          type: "string",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
          ui: {
            component: "textarea",
          },
        },
        {
          name: "href",
          label: "Link URL",
          type: "string",
        },
      ],
    },
  ],
};

export default defineSchema({
  collections: [
    {
      label: "Page Content",
      name: "page",
      path: "content/page",
      fields: [
        {
          type: "object",
          list: true,
          name: "blocks",
          label: "Sections",
          templates: [heroBlock, projectSection, featureSection],
        },
      ],
    },
    {
      label: "Blog Posts",
      name: "post",
      path: "content/post",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Blog Post Body",
          name: "body",
          isBody: true,
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
});
