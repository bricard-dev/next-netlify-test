import { defineField, defineType } from 'sanity';
import { IconPicker } from '@/sanity/components/icon-picker';
import { Award, Cake, CakeSlice, ChefHat, Clock, Heart, Leaf, Package, Sandwich, Star, Truck, Wheat } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType> = {
  Wheat, ChefHat, Heart, Truck, Clock, Award, Leaf, Star, Package, Cake, CakeSlice, Sandwich,
};

export const serviceItemType = defineType({
  name: 'serviceItem',
  title: 'Service Item',
  type: 'object',
  fields: [
    defineField({
      name: 'iconName',
      title: 'Icon',
      type: 'string',
      components: { input: IconPicker },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', iconName: 'iconName' },
    prepare({ title, iconName }) {
      return {
        title,
        subtitle: iconName,
        media: iconName ? ICON_MAP[iconName] : undefined,
      };
    },
  },
});
