#!/bin/bash
# save to .scripts/update_structure.sh
# best way to use is with tree: `brew install tree`

# Create the output file with header
echo "# Project Structure" > .cursor/rules/folder_structure.mdc
echo "" >> .cursor/rules/folder_structure.mdc
echo "\`\`\`" >> .cursor/rules/folder_structure.mdc

# Check if tree command is available
if command -v tree &> /dev/null; then
  # Use tree command for directories only
  find . -type d -not -path "*/\.*" | sort | tree --fromfile -d >> .cursor/rules/folder_structure.mdc
  echo "Using tree command for directory structure visualization."
else
  # Fallback to the alternative approach if tree is not available
  echo "Tree command not found. Using fallback approach."

  # Find all directories (excluding hidden ones)
  find . -type d -not -path "*/\.*" | sort > /tmp/dirs_list.txt

  # Create a simple tree structure
  echo "." > /tmp/tree_items.txt

  # Process each directory to build the tree
  while read -r dir; do
    # Add the directory to the tree
    echo "$dir" >> /tmp/tree_items.txt

    # Add all parent directories
    parent="$dir"
    while [[ "$parent" != "." ]]; do
      parent=$(dirname "$parent")
      echo "$parent" >> /tmp/tree_items.txt
    done
  done < /tmp/dirs_list.txt

  # Sort and remove duplicates
  sort -u /tmp/tree_items.txt > /tmp/tree_sorted.txt
  mv /tmp/tree_sorted.txt /tmp/tree_items.txt

  # Simple tree drawing approach
  prev_dirs=()

  while read -r item; do
    # Skip the root
    if [[ "$item" == "." ]]; then
      continue
    fi

    # Add trailing slash to directory name
    name="$(basename "$item")/"

    # Split path into components
    IFS='/' read -ra path_parts <<< "$item"

    # Calculate depth (number of path components minus 1)
    depth=$((${#path_parts[@]} - 1))

    # Find common prefix with previous path
    common=0
    if [[ ${#prev_dirs[@]} -gt 0 ]]; then
      for ((i=0; i<depth && i<${#prev_dirs[@]}; i++)); do
        if [[ "${path_parts[$i]}" == "${prev_dirs[$i]}" ]]; then
          ((common++))
        else
          break
        fi
      done
    fi

    # Build the prefix
    prefix=""
    for ((i=0; i<depth; i++)); do
      if [[ $i -lt $common ]]; then
        # Check if this component has more siblings
        has_more=0
        for next in $(grep "^$(dirname "$item")/" /tmp/tree_items.txt); do
          if [[ "$next" > "$item" ]]; then
            has_more=1
            break
          fi
        done

        if [[ $has_more -eq 1 ]]; then
          prefix="${prefix}│   "
        else
          prefix="${prefix}    "
        fi
      else
        prefix="${prefix}    "
      fi
    done

    # Determine if this is the last item in its directory
    is_last=1
    dir=$(dirname "$item")
    for next in $(grep "^$dir/" /tmp/tree_items.txt); do
      if [[ "$next" > "$item" ]]; then
        is_last=0
        break
      fi
    done

    # Choose the connector
    if [[ $is_last -eq 1 ]]; then
      connector="└── "
    else
      connector="├── "
    fi

    # Output the item
    echo "${prefix}${connector}${name}" >> .cursor/rules/folder_structure.mdc

    # Save current path for next iteration
    prev_dirs=("${path_parts[@]}")

  done < /tmp/tree_items.txt

  # Clean up
  rm -f /tmp/dirs_list.txt /tmp/tree_items.txt
fi

# Close the code block
echo "\`\`\`" >> .cursor/rules/folder_structure.mdc

echo "Project directory structure has been updated in .cursor/rules/folder_structure.mdc"
